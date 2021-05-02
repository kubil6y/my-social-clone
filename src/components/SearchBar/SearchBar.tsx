import React, { useState, useEffect, ChangeEvent } from 'react';
import Router from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import { baseUrl } from '../../utils';
import { NoResults } from './NoResults';
import { Results } from './Results';
import { PastResults } from './PastResults';
import { useDebounce } from 'react-use';
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
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  const [pastResults, setPastResults] = useState(['asdf']);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVal(value);
  };

  const handleBlur = () => {
    setIsInputFocused(false);

    //if (results.length > 0) {
    //setResults([]);
    //}
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  useEffect(() => {
    const searchUser = async () => {
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

  // TODO
  console.log({
    results,
    resultsLoading,
    pastResults,
    isInputFocused,
  });

  return (
    <Box w="100%" py="5px" px="10px">
      <form>
        <InputGroup>
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
      </form>

      {true && (
        <Box
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
              <PastResults />
            ) : (
              <NoResults />
            )
          ) : (
            <Results
              isLoading={resultsLoading}
              data={results}
              pastResults={pastResults}
              setVal={setVal}
              setResults={setResults}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

/*
// trying to replicate twitter search bar
// render logic

if(isInputFocused) 

  {results.length > 0 ? (
    <>
      <div>REAL SEARCH RESULTS</div>
    </>
  ) : pastResults.length > 0 ? (
    <>
      <div>user searched before</div>
    </>
  ) : (
    <>
      <div>no search history</div>
    </>
  )}

else null

input clicked
no text 
  show past results : noposts
yes text then load it.

add loading screens to all of them.

 */

//<Progress size="xs" isIndeterminate color="blue.500" />
