import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

interface AlertProps {
  header: string;
  body: string;
  showAlert: boolean;
  handleYes: () => void;
  setShowAlert: Function;
}

export const MyAlert: React.FC<AlertProps> = ({
  header,
  body,
  handleYes,
  showAlert,
  setShowAlert,
}) => {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        size='xs'
        isCentered
        isOpen={showAlert}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowAlert(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent rounded='3xl'>
            <AlertDialogHeader
              fontSize='xl'
              fontWeight='bold'
              textAlign='center'
              pb='4px'
            >
              {header}
            </AlertDialogHeader>

            <AlertDialogBody color='gray.500' fontSize='sm'>
              {body}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setShowAlert(false)}
                rounded='3xl'
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={handleYes}
                ml={3}
                rounded='3xl'
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
