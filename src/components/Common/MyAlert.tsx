import React from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  Flex,
  Tooltip,
  Center,
  Icon,
  Text,
  //AlertDialog,
  //AlertDialogBody,
  //AlertDialogContent,
  //AlertDialogFooter,
  //AlertDialogHeader,
  //AlertDialogOverlay,
  Button,
  Box,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

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
  return (
    <>
      <Modal
        isOpen={showAlert}
        onClose={() => {
          setShowAlert(false);
        }}
        size='md'
      >
        <ModalOverlay />
        <ModalContent rounded='3xl'>
          <Flex px='12px' py='5px' borderBottom='1px' borderColor='gray.300'>
            <Tooltip label='Close' fontSize='xs' bg='gray.600'>
              <Center
                cursor='pointer'
                p='7px'
                rounded='full'
                overflow='hidden'
                _hover={{ bg: 'blue.100' }}
                onClick={() => setShowAlert(false)}
              >
                <Icon
                  as={AiOutlineClose}
                  h={5}
                  w={5}
                  color='gray.500'
                  _hover={{ color: 'blue.500' }}
                />
              </Center>
            </Tooltip>
          </Flex>
          <Box p='1rem'>
            <Text fontWeight='bold' textAlign='center' fontSize='2xl'>
              {header}
            </Text>
            <Text color='gray.500' fontSize='sm' mt='10px'>
              {body}
            </Text>
            <Flex justifyContent='flex-end' alignItems='center' mt='10px'>
              <Button
                onClick={() => setShowAlert(false)}
                rounded='3xl'
                px='40px'
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={handleYes}
                ml={3}
                rounded='3xl'
                px='40px'
              >
                Delete
              </Button>
            </Flex>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
