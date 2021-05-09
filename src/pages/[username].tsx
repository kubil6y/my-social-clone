import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { baseUrl } from '../utils';
import { Post, Profile, User, UserFollowStats } from '../types';
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineCalendar,
} from 'react-icons/ai';

interface ProfilePageProps {
  user: User;
  profile: Profile;
  userFollowStats: UserFollowStats;
  posts: Post[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  profile,
  userFollowStats,
  posts,
}) => {
  const router = useRouter();
  const { username } = router.query;

  const { social } = profile;

  const hasAccess = username === user.username;

  return (
    <>
      <Box height='200px' w='100%' bg='gray.300'></Box>
      <Flex
        alignItems='flex-start'
        justifyContent='space-between'
        p='12px'
        pb='0'
        position='relative'
      >
        <Box
          position='absolute'
          width='140px'
          height='140px'
          border='4px'
          borderColor='white'
          rounded='full'
          overflow='hidden'
          sx={{
            transform: 'translateY(-50%)',
            top: '0',
            left: '12px',
          }}
        >
          <Image src={user.profilePicUrl} width={140} height={140} />
        </Box>
        {hasAccess && (
          <Button variant='outline' colorScheme='blue' rounded='full' ml='auto'>
            Edit profile
          </Button>
        )}
      </Flex>
      <Box p='1rem' color='gray.500'>
        <Text fontSize='xl' fontWeight='bold' color='gray.800'>
          {user?.name}
        </Text>

        <Text fontSize='sm'>@{user?.username}</Text>

        {profile?.bio && (
          <Box my='12px'>
            <Text fontSize='sm'>{profile.bio}</Text>
          </Box>
        )}

        <Flex alignItems='flex-end' mt='3px'>
          <Icon as={AiOutlineCalendar} h={6} w={6} />
          <Text ml='4px' fontSize='sm' mt='3px'>
            Joined {dayjs(user?.createdAt).format('MMM YYYY')}
          </Text>
        </Flex>

        {/* social links */}
        <Flex mt='8px'>
          {social?.twitter && (
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Tooltip label='Twitter' bg='gray.500' color='white'>
                <Center
                  h='30px'
                  w='30px'
                  _hover={{ bg: 'gray.100' }}
                  cursor='pointer'
                  rounded='full'
                  overflow='hidden'
                >
                  <Icon color='blue.400' w={5} h={5} as={AiOutlineTwitter} />
                </Center>
              </Tooltip>
            </a>
          )}

          {social?.youtube && (
            <a
              href='https://youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '3px', marginRight: '3px' }}
            >
              <Tooltip label='Youtube' bg='gray.500' color='white'>
                <Center
                  h='30px'
                  w='30px'
                  _hover={{ bg: 'gray.100' }}
                  cursor='pointer'
                  rounded='full'
                  overflow='hidden'
                >
                  <Icon color='red.400' w={5} h={5} as={AiOutlineYoutube} />
                </Center>
              </Tooltip>
            </a>
          )}
          {social?.instagram && (
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '3px', marginRight: '3px' }}
            >
              <Tooltip label='Instagram' bg='gray.500' color='white'>
                <Center
                  h='30px'
                  w='30px'
                  _hover={{ bg: 'gray.100' }}
                  cursor='pointer'
                  rounded='full'
                  overflow='hidden'
                >
                  <Icon color='blue.400' w={5} h={5} as={AiOutlineInstagram} />
                </Center>
              </Tooltip>
            </a>
          )}
          {social?.facebook && (
            <a
              href='http://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Tooltip label='Facebook' bg='gray.500' color='white'>
                <Center
                  h='30px'
                  w='30px'
                  _hover={{ bg: 'gray.100' }}
                  cursor='pointer'
                  rounded='full'
                  overflow='hidden'
                >
                  <Icon color='purple.400' w={5} h={5} as={AiOutlineFacebook} />
                </Center>
              </Tooltip>
            </a>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { username } = context.query;
    const { token } = parseCookies(context, 'token');
    const { data } = await axios.get(`${baseUrl}/api/posts/user/${username}`, {
      headers: { Authorization: token },
    });

    if (!data) {
      return {
        props: {
          error: true,
        },
      };
    }

    const { posts, profile } = data;

    return {
      props: {
        posts,
        profile,
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
