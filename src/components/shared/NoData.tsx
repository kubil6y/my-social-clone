import React from 'react';
import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

interface NoDataProps {
  text: string;
  onClose: () => void;
}
export const NoData: React.FC<NoDataProps> = ({ onClose, text }) => {
  return (
    <Alert status='info'>
      <AlertIcon />
      <AlertTitle mr={2}>{text}</AlertTitle>
      <CloseButton
        position='absolute'
        right='8px'
        top='8px'
        onClick={onClose}
      />
    </Alert>
  );
};
