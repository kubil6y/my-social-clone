import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import Router from 'next/router';
import { Comment, User, UserRoles } from '../../types';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  Center,
  Flex,
  Icon,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { MyAlert } from '../../components';
import { deleteComment } from '../../actions';

interface PostCommentProps {
  user: User;
  postId: string;
  comment: Comment;
  setComments: Function;
}

export const PostComment: React.FC<PostCommentProps> = ({
  comment,
  postId,
  user,
  setComments,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isLargerThan420px] = useMediaQuery('(min-width: 420px)');
  const [isSmall, setIsSmall] = useState(false);

  const hasAccess =
    user.role === UserRoles.root || comment.user.username === user.username;

  React.useEffect(() => {
    if (isLargerThan420px) {
      setIsSmall(false);
    } else {
      setIsSmall(true);
    }
  }, [isLargerThan420px]);

  return (
    <>
      <MyAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        body='This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from the search results. '
        header='Delete Comment?'
        handleYes={() =>
          deleteComment(postId, comment.uuid, setComments, setShowAlert)
        }
      />

      <Flex p='1rem'>
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
          onClick={() => Router.push(`/${comment.user.username}`)}
        >
          <Image src={comment.user.profilePicUrl} width='50px' height='50px' />
        </Center>

        {/* main */}
        <Flex ml='12px' w='100%' flexDir='column'>
          {isSmall ? (
            <>
              <Flex alignItems='center' justifyContent='flex-start'>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                  _hover={{ textDecor: 'underline' }}
                  cursor='pointer'
                  onClick={() => Router.push(`/${comment.user.username}`)}
                >
                  {comment.user.name}
                </Text>

                <Text color='gray.500' mx='5px'>
                  ·
                </Text>

                <Tooltip
                  fontSize='xs'
                  label={
                    dayjs(comment.createdAt).format('h:mm A') +
                    ' · ' +
                    dayjs(comment.createdAt).format('DD/MM/YYYY')
                  }
                  bg='gray.500'
                >
                  <Text
                    color='gray.500'
                    cursor='pointer'
                    fontSize='xs'
                    flexShrink={0}
                    _hover={{ textDecor: 'underline' }}
                  >
                    {dayjs(comment.createdAt).fromNow()}
                  </Text>
                </Tooltip>
              </Flex>
              <Flex>
                <Text
                  color='gray.500'
                  fontSize='sm'
                  cursor='pointer'
                  onClick={() => Router.push(`/${comment.user.username}`)}
                >
                  @{comment.user.username}
                </Text>

                {hasAccess && (
                  <Tooltip label='Delete Comment' fontSize='xs' bg='red.400'>
                    <Center
                      ml='auto'
                      cursor='pointer'
                      p='7px'
                      rounded='full'
                      overflow='hidden'
                      _hover={{ bg: 'red.200' }}
                      onClick={() => setShowAlert(true)}
                    >
                      <Icon as={AiOutlineDelete} h={5} w={5} color='red.500' />
                    </Center>
                  </Tooltip>
                )}
              </Flex>
            </>
          ) : (
            <Flex alignItems='center' justifyContent='flex-start'>
              <Text
                fontSize='sm'
                fontWeight='bold'
                _hover={{ textDecor: 'underline' }}
                cursor='pointer'
                onClick={() => Router.push(`/${comment.user.username}`)}
              >
                {comment.user.name}
              </Text>
              <Text
                ml='5px'
                color='gray.500'
                fontSize='sm'
                cursor='pointer'
                onClick={() => Router.push(`/${comment.user.username}`)}
              >
                @{comment.user.username}
              </Text>

              <Text color='gray.500' mx='5px'>
                ·
              </Text>

              <Tooltip
                fontSize='xs'
                label={
                  dayjs(comment.createdAt).format('h:mm A') +
                  ' · ' +
                  dayjs(comment.createdAt).format('DD/MM/YYYY')
                }
                bg='gray.500'
              >
                <Text
                  color='gray.500'
                  cursor='pointer'
                  fontSize='xs'
                  flexShrink={0}
                  _hover={{ textDecor: 'underline' }}
                >
                  {dayjs(comment.createdAt).fromNow()}
                </Text>
              </Tooltip>

              {hasAccess && (
                <Tooltip label='Delete Comment' fontSize='xs' bg='red.400'>
                  <Center
                    ml='auto'
                    cursor='pointer'
                    p='7px'
                    rounded='full'
                    overflow='hidden'
                    _hover={{ bg: 'red.200' }}
                    onClick={() => setShowAlert(true)}
                  >
                    <Icon as={AiOutlineDelete} h={5} w={5} color='red.500' />
                  </Center>
                </Tooltip>
              )}
            </Flex>
          )}
          <Text>{comment.text}</Text>
        </Flex>
      </Flex>
    </>
  );
};
