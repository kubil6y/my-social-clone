import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';

interface NoPostsProps {
  setShowNoPosts: Function;
}
export const NoPosts: React.FC<NoPostsProps> = ({ setShowNoPosts }) => {
  return (
    <Alert status='info'>
      <AlertIcon />
      <AlertTitle mr={2}>No posts have found.</AlertTitle>
      <AlertDescription>
        Your Chakra experience may be degraded.
      </AlertDescription>
      <CloseButton
        position='absolute'
        right='8px'
        top='8px'
        onClick={setShowNoPosts}
      />
    </Alert>
  );
};
