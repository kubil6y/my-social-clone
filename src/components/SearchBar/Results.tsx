import React from 'react';
import Router from 'next/router';
import Image from 'next/image';
import {
  Box,
  Progress,
  Text,
  Flex,
  Icon,
  Divider,
  Center,
} from '@chakra-ui/react';
import { User } from '../../types';
import { AiOutlineMeh } from 'react-icons/ai';
import { PastResults } from './PastResults';
import { capitalize } from '../../utils';
import { RiUserFill } from 'react-icons/ri';

interface ResultsItemProps {
  item: User;
  setResults: Function;
  pastResults: string[];
  setPastResults: Function;
  setVal: Function;
  setIsDropdown: Function;
}

interface ResultsProps {
  isLoading: boolean;
  data: User[];
  children?: React.ReactNode;
  pastResults: any;
  setPastResults: Function;

  setIsDropdown: Function;
  setResults: Function;
  setVal: Function;
}

export const ResultsItem: React.FC<ResultsItemProps> = ({
  item,
  setResults,
  setVal,
  pastResults,
  setPastResults,
  setIsDropdown,
}) => {
  //const router = useRouter();

  const handleClick = (username: string) => {
    if (!pastResults.includes(username)) {
      setPastResults([item.username, ...pastResults.slice(0, 4)]);
    } else {
      const newPastResults = pastResults.filter((el) => el !== username);
      setPastResults([username, ...newPastResults]);
    }

    setResults([]);
    setVal('');
    setIsDropdown(false);
    Router.push(`/${username}`);
  };

  return (
    <Box w='100%' overflow='hidden'>
      <Flex
        alignItems='center'
        py='16px'
        px='20px'
        _hover={{ bg: 'gray.50' }}
        cursor='pointer'
        onClick={() => handleClick(item.username)}
        overflow='hidden'
      >
        <Center rounded='full' w='40px' h='40px' overflow='hidden'>
          <Image src={item.profilePicUrl} width='40px' height='40px' />
        </Center>
        <Box ml='10px'>
          <Flex alignItems='center'>
            <Text fontWeight='bold'>{capitalize(item.name)}</Text>

            {/* TODO */}
            {item.username == item.username && (
              <Flex alignItems='center' ml='20px'>
                <Icon as={RiUserFill} h={3} w={3} color='gray.500' />
                <Text color='gray.500' fontWeight='bold' ml='3px' fontSize='xs'>
                  Following (wip)
                </Text>
              </Flex>
            )}
          </Flex>
          <Text color='gray.600'>@{item.username}</Text>
        </Box>
      </Flex>
      <Divider orientation='horizontal' />
    </Box>
  );
};

// here data comes in with jsx first.
// its weird, i need to make isArray check to fix it.
export const Results: React.FC<ResultsProps> = ({
  isLoading,
  data,
  pastResults,
  setResults,
  setVal,
  setPastResults,
  setIsDropdown,
}) => {
  return (
    <Box mt='2.45px' minH='100px' overflow='hidden'>
      {isLoading && (
        <Box py='16px' px='20px'>
          <Progress size='xs' isIndeterminate color='blue.500' mt='3px' />
        </Box>
      )}
      {data &&
        Array.isArray(data) &&
        data.map((el) => (
          <ResultsItem
            key={el._id}
            item={el}
            setResults={setResults}
            setVal={setVal}
            pastResults={pastResults}
            setPastResults={setPastResults}
            setIsDropdown={setIsDropdown}
          />
        ))}

      {data && Array.isArray(data) && data.length === 0 && !isLoading && (
        <>
          <Flex p='12px' pt='20px' justifyContent='center' alignItems='center'>
            <Icon as={AiOutlineMeh} h={6} w={6} color='gray.600' />
            <Text color='gray.600' align='center' ml='5px'>
              No results
            </Text>
          </Flex>
          {pastResults && pastResults.length > 0 && (
            <>
              <Divider orientation='horizontal' mt='2.45px' />
              <PastResults
                setVal={setVal}
                setPastResults={setPastResults}
                pastResults={pastResults}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};
