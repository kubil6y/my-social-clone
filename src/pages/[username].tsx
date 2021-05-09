import React, { useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { baseUrl } from '../utils';
import { Post, User, UserFollowStats } from '../types';

interface ProfilePageProps {
  user: User;
  userFollowStats: UserFollowStats;
  posts: Post[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  userFollowStats,
  posts,
}) => {
  // TODO
  //console.log({
  //user,
  //userFollowStats,
  //posts,
  //});

  return (
    <>
      <Box height='200px' w='100%' bg='gray.300'></Box>
      <Flex
        alignItems='flex-start'
        justifyContent='space-between'
        p='12px'
        pb='0'
      >
        <Box
          width='140px'
          height='140px'
          border='4px'
          borderColor='white'
          rounded='full'
          overflow='hidden'
          sx={{
            transform: 'translateY(-50%)',
          }}
        >
          <Image src={user.profilePicUrl} width={132} height={132} />
        </Box>
        <Button variant='outline' colorScheme='blue' rounded='full'>
          Edit profile
        </Button>
      </Flex>
      <p>asfd</p>
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

    return {
      props: {
        posts: data,
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
