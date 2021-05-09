import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import Router from 'next/router';
import {
  Center,
  Divider,
  Flex,
  Text,
  Icon,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { Like, Post, User, UserRoles } from '../../types';
import {
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMessage,
} from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { CommentModal, MyAlert } from '../../components';
import { deletePost, likePost } from '../../actions';

interface PostCardProps {
  user: User;
  post: Post;
  setPosts: Function;
}

export const PostCard: React.FC<PostCardProps> = ({ user, post, setPosts }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [showAlert, setShowAlert] = useState(false);

  // ui states
  const [showCommentModal, setShowCommentModal] = useState(false);

  const hasAccess =
    user.role === UserRoles.root || post.user.username === user.username;
  // @ts-ignore
  const hasLikedBefore = likes.find((like: Like) => like.user === user._id);

  const handleTrashIconClick = () => {
    setShowAlert(true);
  };

  const pushToPostDetails = () => {
    Router.push(`/${post.user.username}/status/${post._id}`);
  };

  const pushToUserDetails = () => {
    Router.push(`/${post.user.username}`);
  };

  return (
    <>
      <CommentModal
        user={user}
        post={post}
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        setComments={setComments}
      />

      <MyAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        body='This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from the search results. '
        header='Delete Message?'
        handleYes={() => deletePost(post._id, setPosts, setShowAlert)}
      />

      <Flex p='1rem' _hover={{ bg: 'gray.100' }}>
        {/* avatar */}
        <Center
          overflow='hidden'
          rounded='full'
          w='50px'
          h='50px'
          cursor='pointer'
          flexShrink={0}
          _hover={{
            filter: 'opacity(.8)',
          }}
          onClick={pushToUserDetails}
        >
          <Image src={post.user.profilePicUrl} width='50px' height='50px' />
        </Center>

        {/* main */}
        <Flex ml='12px' w='100%' flexDir='column'>
          <Flex
            alignItems='center'
            justifyContent='flex-start'
            cursor='pointer'
            onClick={pushToUserDetails}
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
            {post?.location && (
              <>
                <Text color='gray.500' mx='5px'>
                  ·
                </Text>
                <Flex alignItems='center' ml='-3px' justifyContent='center'>
                  <Icon as={MdLocationOn} color='gray.500' w={4} h={4} />
                  <Text fontSize='xs' color='gray.500'>
                    {post?.location}
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
          <Text cursor='pointer' onClick={pushToPostDetails}>
            {post.text}
          </Text>

          {post.picUrl && (
            <Box
              my='8px'
              rounded='xl'
              overflow='hidden'
              cursor='pointer'
              onClick={pushToPostDetails}
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
                  onClick={() => setShowCommentModal(true)}
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

              <Text mx='3px' color='gray.500' fontSize='sm' userSelect='none'>
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
                    onClick={() =>
                      likePost(user._id, post._id, setLikes, false)
                    }
                  >
                    <Icon as={AiFillHeart} h={5} w={5} color='red.500' />
                  </Center>
                </Tooltip>
                <Text mx='3px' color='gray.500' fontSize='sm' userSelect='none'>
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
                <Text mx='3px' color='gray.500' fontSize='sm' userSelect='none'>
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
        </Flex>
      </Flex>
      <Divider orientation='horizontal' />
    </>
  );
};
