import React from 'react';
import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

interface NoPostsProps {
  setShowNoPosts: () => void;
}
export const NoPosts: React.FC<NoPostsProps> = ({ setShowNoPosts }) => {
  return (
    <Alert status='info'>
      <AlertIcon />
      <AlertTitle mr={2}>No posts have found.</AlertTitle>
      <CloseButton
        position='absolute'
        right='8px'
        top='8px'
        onClick={setShowNoPosts}
      />
    </Alert>
  );
};
