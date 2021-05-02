import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { Box, Center, Divider, Flex, Icon, Text } from '@chakra-ui/react';

interface PastResultsProps {}

interface PastResultsItemProps {}

export const PastResultsItem: React.FC<PastResultsItemProps> = () => {
  // search term on click
  const handleTermClick = (term: string) => {
    console.log('clicked on', term);
    //setPastResults((prev) => [term, ...prev]);
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
        <Flex alignItems="center" onClick={() => handleTermClick('a')}>
          <Center p="8px" rounded="full" bg="gray.200" h="40px" w="40px">
            <Icon h="25px" w="25px" as={BsSearch} color="gray.500" />
          </Center>
          <Text ml="12px" mr="auto">
            some name
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
            onClick={() => console.log('x pastitem clicked')}
          />
        </Center>
      </Flex>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export const PastResults: React.FC<PastResultsProps> = () => {
  return (
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
          >
            Clear all
          </Text>
        </Flex>
      </Box>
      <Divider orientation="horizontal" />
      <PastResultsItem />
    </>
  );
};
