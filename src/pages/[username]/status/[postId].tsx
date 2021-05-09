import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import cookie from 'js-cookie';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import {
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineMessage,
} from 'react-icons/ai';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { baseUrl, catchErrors } from '../../../utils';
import {
  Flex,
  Icon,
  Text,
  Center,
  Box,
  Alert,
  AlertIcon,
  Tooltip,
  Divider,
  Collapse,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { Like, Post, User, UserRoles } from '../../../types';
import { MyAlert, PostComment } from '../../../components';
import { addComment, deletePost, likePost } from '../../../actions';

interface PostDetailsProps {
  user: User;
  data?: Post;
  error?: boolean;
}

const PostDetails: React.FC<PostDetailsProps> = ({
  user,
  data: post,
  error,
}) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [text, setText] = useState('');

  // ui states
  const [showAlert, setShowAlert] = useState(false);
  const [showInputField, setShowInputField] = useState(true);

  // small states
  const hasAccess =
    user.role === UserRoles.root || post.user.username === user.username;

  // @ts-ignore
  const hasLikedBefore = likes.find(
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

  const handleYes = async () => {
    try {
      await axios.delete(`${baseUrl}/api/posts/${post._id}`, {
        headers: {
          Authorization: cookie.get('token'),
        },
      });
      setShowAlert(false);
    } catch (error) {
      console.log(catchErrors(error));
    } finally {
      Router.push('/');
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addComment(post._id, text, setText, setComments, () =>
      setShowInputField(false)
    );
  };

  return (
    <>
      <MyAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        body='This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from the search results. '
        header='Delete Message?'
        handleYes={handleYes}
      />
      <Box
        display='inline-flex'
        cursor='pointer'
        borderBottom='1px'
        borderColor='gray.100'
        px='15px'
        height='53px'
        alignItems='center'
        onClick={() => Router.push('/')}
      >
        <Icon as={AiOutlineArrowLeft} w={7} h={7} color='blue.500' />
        <Text fontSize='20px' fontWeight='bold' lineHeight='24px' ml='1rem'>
          Home
        </Text>
      </Box>

      <Box p='1rem'>
        <Link href={`/${post.user.username}`}>
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
                src={post?.user?.profilePicUrl}
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
                  {post.user.name}
                </Text>

                <Text color='gray.500' fontSize='sm'>
                  @{post.user.username}
                </Text>
              </Box>
            </Box>
          </Box>
        </Link>
        <Text fontSize='2xl'>{post.text}</Text>

        {post?.picUrl && (
          <Box
            my='8px'
            rounded='xl'
            overflow='hidden'
            cursor='pointer'
            onClick={() => console.log('todo full image maybe?')}
          >
            <img
              src={post.picUrl}
              style={{
                maxHeight: '400px',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        )}

        {/* button group */}
        <Flex mt='6px'>
          <Flex alignItems='center'>
            <Tooltip label='Comment' fontSize='xs' bg='gray.500'>
              <Center
                cursor='pointer'
                p='7px'
                rounded='full'
                overflow='hidden'
                _hover={{ bg: 'blue.100' }}
                onClick={() => setShowInputField((st) => !st)}
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

            <Text
              mx='3px'
              color={comments.length > 0 ? 'blue.500' : 'gray.500'}
              fontSize='sm'
              userSelect='none'
            >
              {comments.length}
            </Text>
          </Flex>

          {hasLikedBefore ? (
            <Flex alignItems='center' mx='25px'>
              <Tooltip label='Dislike' fontSize='xs' bg='gray.500'>
                <Center
                  p='7px'
                  cursor='pointer'
                  rounded='full'
                  overflow='hidden'
                  _hover={{ bg: 'red.100', color: 'red.500' }}
                  onClick={() => likePost(user._id, post._id, setLikes, false)}
                >
                  <Icon as={AiFillHeart} h={5} w={5} color='red.500' />
                </Center>
              </Tooltip>
              <Text
                mx='3px'
                color={likes.length > 0 ? 'red.500' : 'gray.500'}
                fontSize='sm'
                userSelect='none'
              >
                {likes.length}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems='center' mx='25px'>
              <Tooltip label='Like' fontSize='xs' bg='gray.500'>
                <Center
                  cursor='pointer'
                  p='7px'
                  rounded='full'
                  overflow='hidden'
                  _hover={{ bg: 'red.100', color: 'red.500' }}
                  onClick={() => likePost(user._id, post._id, setLikes, true)}
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
              <Text
                mx='3px'
                color={likes.length > 0 ? 'red.500' : 'gray.500'}
                fontSize='sm'
                userSelect='none'
              >
                {likes.length}
              </Text>
            </Flex>
          )}

          {hasAccess && (
            <Tooltip label='Delete Message' fontSize='xs' bg='red.400'>
              <Center
                cursor='pointer'
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
      </Box>

      <Collapse in={showInputField} animateOpacity>
        {showInputField && (
          <form onSubmit={handleSubmit}>
            <Flex flexDir='column' p='1rem'>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                fontSize='20px'
                color='gray.700'
                maxLength={200}
                rows={2}
                w='100%'
                resize='vertical'
                placeholder='Enter your comment'
              />
              <Button
                type='submit'
                colorScheme='blue'
                size='md'
                rounded='full'
                my='10px'
                ml='auto'
              >
                send
              </Button>
            </Flex>
          </form>
        )}
      </Collapse>

      {post?.comments && comments.length > 0 && (
        <>
          <Divider orientation='horizontal' />
          <Box>
            {comments.map((comment: any) => (
              <PostComment
                key={comment.uuid}
                comment={comment}
                user={user}
                setComments={setComments}
                postId={post._id}
              />
            ))}
          </Box>
        </>
      )}
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
