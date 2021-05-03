import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import {
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Text,
  Button,
} from '@chakra-ui/react';

interface PastResultsProps {
  pastResults: string[];
  setPastResults: Function;
  setVal: Function;
}

interface PastResultsItemProps {
  pastResults: string[];
  item: string;
  setPastResults: Function;
  setVal: Function;
}

export const PastResultsItem: React.FC<PastResultsItemProps> = ({
  item,
  pastResults,
  setPastResults,
  setVal,
}) => {
  // search term on click
  const handleTermClick = (term: string) => {
    console.log('clicked on', term);
    setVal(term);
    //setPastResults((prev) => [term, ...prev]);
  };

  const handleDeleteItem = (target: string) => {
    const newPastResults = pastResults.filter((el) => el !== target);
    setPastResults(newPastResults);
  };

  return (
    <Box w="100%" overflow="hidden">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        py="16px"
        px="20px"
        cursor="pointer"
        _hover={{ bg: 'gray.50' }}
      >
        <Flex alignItems="center" onClick={() => handleTermClick(item)}>
          <Center p="8px" rounded="full" bg="gray.200" h="40px" w="40px">
            <Icon h="25px" w="25px" as={BsSearch} color="gray.500" />
          </Center>
          <Text ml="12px" mr="auto">
            {item}
          </Text>
        </Flex>
        <Center
          overflow="hidden"
          rounded="full"
          _hover={{ bg: 'gray.200' }}
          minH="32px"
          minW="32px"
        >
          <Icon
            h="1.3em"
            w="1.3em"
            as={AiOutlineClose}
            color="blue.500"
            onClick={() => handleDeleteItem(item)}
          />
        </Center>
      </Flex>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export const PastResults: React.FC<PastResultsProps> = ({
  setVal,
  pastResults,
  setPastResults,
}) => {
  const [isClearAll, setIsClearAll] = useState(false);

  const handleClear = () => {
    setPastResults([]);
  };

  const handleCancel = () => {
    setIsClearAll(false);
  };

  return isClearAll ? (
    <Box maxW="100%" p="1rem">
      <Text textAlign="center" fontSize="20px" fontWeight="bold">
        Clear all recent searches?
      </Text>
      <Text textAlign="center" color="gray.600" fontSize="12" my="10px">
        This can't be undone and you'll remove all your recent searches.
      </Text>
      <Flex alignItems="center" justifyContent="center">
        <Button
          onClick={handleCancel}
          colorScheme="gray"
          cursor="pointer"
          bg="gray.200"
          rounded="full"
          fontSize="sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleClear}
          cursor="pointer"
          colorScheme="red"
          rounded="full"
          fontSize="sm"
          ml="10px"
        >
          Clear
        </Button>
      </Flex>
    </Box>
  ) : (
    <>
      <Box px="16px" py="10px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Recent
          </Text>
          <Text
            rounded="full"
            fontSize="xs"
            fontWeight="bold"
            color="blue.500"
            px="1em"
            py=".5em"
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
            onClick={() => setIsClearAll(true)}
          >
            Clear all
          </Text>
        </Flex>
      </Box>
      <Divider orientation="horizontal" />
      {pastResults &&
        pastResults.map((item, idx) => (
          <PastResultsItem
            key={idx}
            item={item}
            pastResults={pastResults}
            setPastResults={setPastResults}
            setVal={setVal}
          />
        ))}
    </>
  );
};
