import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Box, Flex, Text } from '@chakra-ui/react';
import { baseUrl, capitalize } from '../utils';
import { Post } from '../types';
import { CreatePost } from '../components';

export default function Home({ user, userFollowStats, data: postData }) {
  const [posts, setPosts] = useState<Post[]>(postData);

  // setting up title
  useEffect(() => {
    const title = `Welcome ${capitalize(user.name)}`;
    document.title = title;
  }, []);

  return (
    <div>
      <Head>
        <title>My Social</title>
      </Head>

      <Flex px='15px' height='53px' alignItems='center'>
        <Text fontSize='20px' fontWeight='bold' lineHeight='24px'>
          Home
        </Text>
      </Flex>

      <CreatePost src={user.profilePicUrl} />

      <Box>
        {posts &&
          posts.map((post) => (
            <Box key={post._id} p='1rem' border='1px' borderColor='red'>
              <h1>{post.user.name}</h1>
              <h2>{post.text}</h2>
            </Box>
          ))}
      </Box>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context, 'token');
  const { data } = await axios.get(`${baseUrl}/api/posts`, {
    headers: { Authorization: token },
  });

  if (!data) {
    throw new Error('yarak');
  }

  return {
    props: {
      data,
    },
  };
};
