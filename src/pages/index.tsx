import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { baseUrl, capitalize } from '../utils';
import { Post } from '../types';
import { CreatePost, NoPosts, PostCard, PostError } from '../components';

export default function Home({
  user,
  userFollowStats,
  data: postData,
  error: postsError,
}) {
  const [posts, setPosts] = useState<Post[]>(postData);
  const [error, setError] = useState<any>(postsError);

  // ui states
  const [showErrorMsg, setShowErrorMsg] = useState(true);
  const [showNoPost, setShowNoPosts] = useState(true);

  if (error && showErrorMsg)
    return <PostError setShowMsg={() => setShowErrorMsg(false)} />;

  // setting up title
  useEffect(() => {
    const title = `Welcome ${capitalize(user.name)}`;
    document.title = title;
  }, []);

  return (
    <Box>
      <Head>
        <title>My Social</title>
      </Head>

      <Flex px='15px' height='53px' alignItems='center'>
        <Text fontSize='20px' fontWeight='bold' lineHeight='24px'>
          Home
        </Text>
      </Flex>

      <CreatePost user={user} setPosts={setPosts} />

      <Divider orientation='horizontal' />

      {posts.length === 0 && showNoPost && (
        <NoPosts setShowNoPosts={() => setShowNoPosts(false)} />
      )}

      <Box w='100%'>
        {posts &&
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
            />
          ))}
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { token } = parseCookies(context, 'token');
    const { data } = await axios.get(`${baseUrl}/api/posts`, {
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
