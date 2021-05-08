import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Center, Divider, Flex, Text, Icon, Tooltip } from '@chakra-ui/react';
import { Like, Post, User, UserRoles } from '../../types';
import {
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMessage,
} from 'react-icons/ai';
import { Alert } from './Alert';

interface PostCardProps {
  user: User;
  post: Post;
  setPosts: Function;
}

export const PostCard: React.FC<PostCardProps> = ({ user, post, setPosts }) => {
  const router = useRouter();

  const [likes, setLikes] = useState(post.likes);
  const [showAlert, setShowAlert] = useState(false);
  const hasAccess =
    user.role === UserRoles.root || post.user.username === user.username;

  // @ts-ignore
  const hasLikedBefore = post.likes.find(
    (like: Like) => like.user === user._id
  );

  const handleTrashIconClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        body='This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from the search results. '
        header='Delete Message?'
        handleYes={() => {
          console.log('clicked delete yes and modal will close');
          setShowAlert(false);
        }}
      />

      <Flex
        p='1rem'
        cursor='pointer'
        _hover={{ bg: 'gray.100' }}
        onClick={() => router.push(`/${post.user.username}/status/${post._id}`)}
      >
        {/* avatar */}
        <Center
          overflow='hidden'
          rounded='full'
          w='50px'
          h='50px'
          flexShrink={0}
        >
          <Image src={post.user.profilePicUrl} width='50px' height='50px' />
        </Center>

        {/* main */}
        <Flex ml='12px' w='100%' flexDir='column'>
          <Flex alignItems='center' justifyContent='flex-start'>
            <Link href={`/${post.user.username}`}>
              <Text
                fontSize='sm'
                fontWeight='bold'
                _hover={{ textDecor: 'underline' }}
              >
                {post.user.name}
              </Text>
            </Link>
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
                _hover={{ textDecor: 'underline' }}
              >
                {dayjs(post.createdAt).fromNow()}
              </Text>
            </Tooltip>
          </Flex>
          <Text>{post.text}</Text>

          {/* button group */}
          <Flex mt='4px'>
            <Tooltip label='Comment' fontSize='xs' bg='gray.500'>
              <Center
                p='7px'
                rounded='full'
                overflow='hidden'
                _hover={{ bg: 'blue.100' }}
                onClick={() => console.log('comment icon clicked')}
              >
                <Icon
                  as={AiOutlineMessage}
                  h={5}
                  w={5}
                  color='gray.500'
                  _hover={{ color: 'blue.500' }}
                />
              </Center>
            </Tooltip>

            {hasLikedBefore ? (
              <Tooltip label='Dislike' fontSize='xs' bg='gray.500'>
                <Center
                  p='7px'
                  mx='12px'
                  rounded='full'
                  overflow='hidden'
                  _hover={{ bg: 'red.100', color: 'red.500' }}
                  onClick={() => console.log('dislike!')}
                >
                  <Icon as={AiFillHeart} h={5} w={5} color='red.500' />
                </Center>
              </Tooltip>
            ) : (
              <Tooltip label='Like' fontSize='xs' bg='gray.500'>
                <Center
                  p='7px'
                  mx='12px'
                  rounded='full'
                  overflow='hidden'
                  _hover={{ bg: 'red.100', color: 'red.500' }}
                  onClick={() => console.log('like')}
                >
                  <Icon
                    as={AiOutlineHeart}
                    h={5}
                    w={5}
                    color='gray.500'
                    _hover={{ color: 'red.500' }}
                  />
                </Center>
              </Tooltip>
            )}

            {hasAccess && (
              <Tooltip label='Delete Message' fontSize='xs' bg='red.400'>
                <Center
                  p='7px'
                  rounded='full'
                  overflow='hidden'
                  _hover={{ bg: 'red.200' }}
                  onClick={handleTrashIconClick}
                >
                  <Icon as={AiOutlineDelete} h={5} w={5} color='red.500' />
                </Center>
              </Tooltip>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Divider orientation='horizontal' />
    </>
  );
};
