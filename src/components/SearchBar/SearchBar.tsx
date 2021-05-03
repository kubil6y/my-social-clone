import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { baseUrl } from '../../utils';
import { NoResults } from './NoResults';
import { Results } from './Results';
import { PastResults } from './PastResults';
import { useDebounce } from 'react-use';
import { useClickOutside, useLocalStorage } from '../../hooks';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Center,
} from '@chakra-ui/react';

// axios canceler
let cancel: any;

export const SearchBar = () => {
  const dropboxRef = useRef();
  const inputRef = useRef();

  const [isDropdown, setIsDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleClickOutside = () => {
    setIsDropdown(false);
  };
  useClickOutside(dropboxRef, inputRef, handleClickOutside);

  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');
  useDebounce(
    () => {
      setDebouncedValue(val);
    },
    300,
    [val]
  );

  const [resultsLoading, setResultsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [pastResults, setPastResults] = useLocalStorage('pastResults', []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVal(value);
  };

  const handleFocus = () => {
    setIsDropdown(true);
    setIsInputFocused(true);
  };
  const handleBlur = () => {
    setIsInputFocused(false);
  };

  // SEARCHING USER WITH DEBOUNCED VALUE
  useEffect(() => {
    const searchUser = async () => {
      // no input value
      if (debouncedValue.length === 0) return;

      setResultsLoading(true);
      try {
        cancel && cancel();

        const CancelToken = axios.CancelToken;
        const token = cookie.get('token');

        const { data } = await axios.get(
          `${baseUrl}/api/search/${debouncedValue}`,
          {
            headers: { Authorization: token },
            cancelToken: new CancelToken((canceler) => {
              cancel = canceler;
            }),
          }
        );

        setResults(data);
      } catch (error) {
        console.log('error searching');
      } finally {
        setResultsLoading(false);
      }
    };
    searchUser();
  }, [debouncedValue]);

  return (
    <Box w="100%" py="5px" px="10px" bg="white">
      <Box></Box>
      <InputGroup ref={inputRef}>
        <InputLeftElement
          pointerEvents="none"
          children={<AiOutlineSearch color="gray.500" />}
        />
        <Input
          type="text"
          placeholder="Search MySocial"
          rounded="full"
          value={val}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          bg={isInputFocused ? 'white' : 'gray.100'}
        />

        {val.length > 0 && (
          <InputRightElement
            cursor="pointer"
            children={
              <Center
                p="4px"
                bg="blue.500"
                rounded="full"
                overflow="hidden"
                onClick={() => setVal('')}
              >
                <AiOutlineClose color="white" />
              </Center>
            }
          />
        )}
      </InputGroup>

      {isDropdown && (
        <Box
          ref={dropboxRef}
          mt="2.45px"
          minH="100px"
          borderRadius="4px"
          fontSize="15px"
          sx={{
            boxShadow:
              'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px',
          }}
        >
          {debouncedValue.length === 0 ? (
            pastResults.length > 0 ? (
              <PastResults
                setVal={setVal}
                pastResults={pastResults}
                setPastResults={setPastResults}
              />
            ) : (
              <NoResults />
            )
          ) : (
            <Results
              isLoading={resultsLoading}
              data={results}
              pastResults={pastResults}
              setPastResults={setPastResults}
              setVal={setVal}
              setResults={setResults}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
