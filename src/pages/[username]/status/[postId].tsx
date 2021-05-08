import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import {
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineMessage,
} from 'react-icons/ai';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { baseUrl } from '../../../utils';
import {
  Flex,
  Icon,
  Text,
  Center,
  Box,
  Alert,
  AlertIcon,
  Tooltip,
} from '@chakra-ui/react';
import { Like, Post, User, UserRoles } from '../../../types';
import { MyAlert } from '../../../components';

interface PostDetailsProps {
  user: User;
  data?: Post;
  error?: boolean;
}

const PostDetails: React.FC<PostDetailsProps> = ({
  user,
  data: postData,
  error,
}) => {
  const router = useRouter();
  //const { postId, username } = router.query;

  // ui states
  const [showAlert, setShowAlert] = useState(false);

  // small states
  const hasAccess =
    user.role === UserRoles.root || postData.user.username === user.username;

  // @ts-ignore
  const hasLikedBefore = postData.likes.find(
    (like: Like) => like.user.toString() === user._id.toString()
  );

  if (error) {
    return (
      <Box p='1rem' w='100%'>
        <Alert status='error'>
          <AlertIcon />
          There was an error processing your request.
        </Alert>
      </Box>
    );
  }

  const handleTrashIconClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      <MyAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        body='This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from the search results. '
        header='Delete Message?'
        handleYes={() => {
          console.log('clicked delete yes and modal will close');
          setShowAlert(false);
        }}
      />
      <Box
        display='inline-flex'
        cursor='pointer'
        borderBottom='1px'
        borderColor='gray.100'
        px='15px'
        height='53px'
        alignItems='center'
        onClick={() => router.push('/')}
      >
        <Icon as={AiOutlineArrowLeft} w={7} h={7} color='blue.500' />
        <Text fontSize='20px' fontWeight='bold' lineHeight='24px' ml='1rem'>
          Home
        </Text>
      </Box>

      <Box p='1rem'>
        <Link href={`/${postData.user.username}`}>
          <Box display='inline-flex' cursor='pointer'>
            <Center
              rounded='full'
              overflow='hidden'
              w='48px'
              h='48px'
              _hover={{
                filter: 'opacity(.8)',
              }}
            >
              <Image
                src={postData?.user?.profilePicUrl}
                alt='user profile picture'
                width={48}
                height={48}
              />
            </Center>
            <Box ml='1rem'>
              <Box alignItems='center' justifyContent='flex-start'>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                  _hover={{ textDecor: 'underline' }}
                >
                  {postData.user.name}
                </Text>

                <Text color='gray.500' fontSize='sm'>
                  @{postData.user.username}
                </Text>
              </Box>
            </Box>
          </Box>
        </Link>
        <Text fontSize='2xl'>{postData.text}</Text>

        {/* button group */}
        <Flex mt='4px'>
          <Tooltip label='Comment' fontSize='xs' bg='gray.500'>
            <Center
              p='7px'
              rounded='full'
              overflow='hidden'
              cursor='pointer'
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
                cursor='pointer'
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
                cursor='pointer'
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
                cursor='pointer'
                onClick={handleTrashIconClick}
              >
                <Icon as={AiOutlineDelete} h={5} w={5} color='red.500' />
              </Center>
            </Tooltip>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default PostDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { postId } = context.query;
    const { token } = parseCookies(context, 'token');
    const { data } = await axios.get(`${baseUrl}/api/posts/${postId}`, {
      headers: { Authorization: token },
    });

    if (!data) {
      return {
        props: {
          error: true,
        },
      };
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
