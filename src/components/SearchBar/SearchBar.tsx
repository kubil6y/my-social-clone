import React, { ChangeEvent, useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import { baseUrl } from '../../utils';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { NoResults } from './NoResults';
import { Results } from './Results';
import { PastResults } from './PastResults';

// TODO
// save last 5 search terms to cookies.
// give an option to delete them
// give an option to research them

// connect search input to database
// render dropdown conditionally
// logic is at the bottom

export const SearchBar = () => {
  const [text, setText] = useState('');
  const [resultsLoading, setResultsLoading] = useState(false);
  const [results, setResults] = useState(['asdf']);

  const [pastResults, setPastResults] = useState(['asfd']);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(text);
  };

  useEffect(() => {
    if (isInputFocused) {
      console.log('yes its focused!!');
    } else {
      console.log('nooo its not focused!!');
    }
  }, [isInputFocused]);

  useEffect(() => {
    //setPastResults(JSON.stringify(pastResults));
    return;
  }, [pastResults]);

  return (
    <Box w="100%" py="5px" px="10px">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<AiOutlineSearch color="gray.500" />}
        />
        <Input
          type="text"
          placeholder="Search MySocial"
          rounded="full"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          bg={isInputFocused ? 'white' : 'gray.200'}
        />
      </InputGroup>

      {isInputFocused && (
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
          {text.length === 0 ? (
            pastResults.length > 0 ? (
              <PastResults setPastResults={setPastResults} />
            ) : (
              <NoResults />
            )
          ) : (
            <Results isLoading={true} />
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
