import React from 'react';
import { Box, Center, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

interface PastResultsProps {}

interface PastResultsItemProps {
  setPastResults: Function;
}

export const PastResultsItem: React.FC<PastResultsItemProps> = ({
  setPastResults,
}) => {
  // search term on click
  //const handleTermClick = (term: string) => {
  //console.log('clicked on', term);
  //setPastResults((prev) => [term, ...prev]);
  //};

  return (
    <Box w="100%" overflow="hidden">
      <>
        <Flex
          justifyContent="space-between"
          w="100%"
          py="16px"
          px="20px"
          cursor="pointer"
          _hover={{ bg: 'gray.100' }}
          //onClick={() => handleTermClick(text)}
        >
          <Icon h="24px" w="24px" as={BsSearch} color="gray.400" />
          <Text ml="12px" mr="auto" fontWeight="bold">
            some name
          </Text>
          <Icon
            h="25px"
            w="25px"
            as={AiOutlineClose}
            color="gray.400"
            p="3px"
            overflow="hidden"
            rounded="full"
            _hover={{ bg: 'gray.200' }}
          />
        </Flex>
        <Divider orientation="horizontal" />
      </>
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
            _hover={{ bg: 'gray.200' }}
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
