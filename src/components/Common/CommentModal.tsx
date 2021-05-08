import React, { ChangeEvent, useRef, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Router from 'next/router';
import { Post, User } from '../../types';
import { AiOutlineClose } from 'react-icons/ai';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Icon,
  Center,
  Tooltip,
  Textarea,
  Text,
  Button,
} from '@chakra-ui/react';

interface CommentModalProps {
  user: User;
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  setPosts: Function;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  user,
  post,
  isOpen,
  onClose,
  setPosts,
}) => {
  // states
  const [text, setText] = useState('');
  const isSendDisabled = text.length === 0;

  // initial focus
  const initialRef = useRef(null);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO
    //setPosts((prev: any) => ({ ...prev }));
    console.log({
      text,
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setText('');
          onClose();
        }}
        size='lg'
      >
        <ModalOverlay />
        <ModalContent rounded='3xl'>
          <Flex px='8px' py='4px' borderBottom='1px' borderColor='gray.300'>
            <Tooltip label='Close' fontSize='xs' bg='gray.500'>
              <Center
                cursor='pointer'
                p='7px'
                rounded='full'
                overflow='hidden'
                _hover={{ bg: 'blue.100' }}
                onClick={onClose}
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

          <Flex p='1rem'>
            {/* avatar */}
            <Center
              overflow='hidden'
              rounded='full'
              w='50px'
              h='50px'
              cursor='pointer'
              flexShrink={0}
              onClick={() => console.log('clicked avatar')}
              _hover={{
                filter: 'opacity(.8)',
              }}
            >
              <Image src={post.user.profilePicUrl} width='50px' height='50px' />
            </Center>

            {/* main */}
            <Flex ml='12px' w='100%' flexDir='column'>
              <Flex
                alignItems='center'
                justifyContent='flex-start'
                cursor='pointer'
                onClick={() => console.log('push username page')}
              >
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                  _hover={{ textDecor: 'underline' }}
                >
                  {post.user.name}
                </Text>
                <Text ml='5px' color='gray.500' fontSize='sm'>
                  @{post.user.username}
                </Text>

                <Text color='gray.500' mx='5px'>
                  ·
                </Text>

                <Tooltip
                  fontSize='xs'
                  label={
                    dayjs(post.createdAt).format('h:mm A') +
                    ' · ' +
                    dayjs(post.createdAt).format('DD/MM/YYYY')
                  }
                  bg='gray.500'
                >
                  <Text
                    color='gray.500'
                    fontSize='xs'
                    flexShrink={0}
                    _hover={{ textDecor: 'underline' }}
                  >
                    {dayjs(post.createdAt).fromNow()}
                  </Text>
                </Tooltip>
              </Flex>
              <Text>{post.text}</Text>
            </Flex>
          </Flex>

          <Flex w='full' alignItems='flex-start' p='1rem'>
            {/* user picture */}
            <Center
              rounded='full'
              overflow='hidden'
              mt='2px'
              mr='1rem'
              flexShrink={0}
              cursor='pointer'
              onClick={() => Router.push(`/${user.username}`)}
              _hover={{
                filter: 'opacity(.8)',
              }}
            >
              <Image
                src={user?.profilePicUrl}
                alt='user profile picture'
                width={48}
                height={48}
              />
            </Center>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Textarea
                initialfocusref={initialRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                borderColor='transparent'
                _hover={{ borderColor: 'transparent' }}
                _focus={{ borderColor: 'transparent' }}
                fontSize='20px'
                color='gray.700'
                maxLength={200}
                rows={2}
                w='100%'
                p='0'
                resize='vertical'
                placeholder='Enter your reply'
              />

              {/* input button group */}
              <Flex w='full' mt='12px'>
                <Tooltip
                  bg='red.400'
                  color='white'
                  label={isSendDisabled && 'Text field must not be empty'}
                >
                  <Button
                    ml='auto'
                    colorScheme='blue'
                    bg={isSendDisabled ? 'blue.200' : 'blue.500'}
                    _hover={{
                      bg: isSendDisabled ? 'blue.200' : 'blue.600',
                    }}
                    cursor={isSendDisabled ? 'auto' : 'pointer'}
                    rounded='full'
                    letterSpacing='wide'
                    textDecoration='uppercase'
                  >
                    send
                  </Button>
                </Tooltip>
              </Flex>
            </form>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
