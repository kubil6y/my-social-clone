import React from 'react';
import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

interface PostErrorProps {
  setShowMsg: () => void;
}
export const PostError: React.FC<PostErrorProps> = ({ setShowMsg }) => {
  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle mr={2}>Something went wrong.</AlertTitle>
      <CloseButton
        position='absolute'
        right='8px'
        top='8px'
        onClick={setShowMsg}
      />
    </Alert>
  );
};
