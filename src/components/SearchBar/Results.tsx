import React from 'react';
import { Box, Progress } from '@chakra-ui/react';

interface ResultsProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export const Results: React.FC<ResultsProps> = ({ isLoading }) => {
  return (
    <Box mt="2.45px" minH="100px">
      {isLoading ? (
        <Box py="16px" px="20px">
          <Progress size="xs" isIndeterminate color="blue.500" mt="3px" />
        </Box>
      ) : (
        <Box>results will be shown here</Box>
      )}
    </Box>
  );
};
