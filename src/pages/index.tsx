import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Divider,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { baseUrl, capitalize } from '../utils';
import { Post } from '../types';
import { CreatePost, NoData, PostCard, PostError } from '../components';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home({ user, data: postData, error: postsError }) {
  useEffect(() => {
    cookie.set('email', '', {
      domain: '/',
      expires: new Date(),
    });
  }, []);

  const [posts, setPosts] = useState<Post[]>(postData);
  const [error, setError] = useState<any>(postsError);

  // infinite scroll states
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2); // 2 by default

  // ui states
  const [showErrorMsg, setShowErrorMsg] = useState(true);
  const [showNoPost, setShowNoPosts] = useState(true);

  if (error && showErrorMsg)
    return <PostError setShowMsg={() => setShowErrorMsg(false)} />;

  // setting up title
  useEffect(() => {
    const title = user && `Welcome ${capitalize(user?.name)}`;
    document.title = title;
  }, []);

  const fetchDataOnScroll = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get('token') },
        params: { pageNumber },
      });

      if (data.length === 0) setHasMore(false); // inf scroll requires it.

      setPosts((prev) => [...prev, ...data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      console.log('Error fetching posts');
    }
  };

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
        <NoData
          onClose={() => setShowNoPosts(false)}
          text='No posts have found.'
        />
      )}

      <InfiniteScroll
        hasMore={hasMore}
        next={fetchDataOnScroll}
        loader={
          <Center w='100%' p='1rem'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Center>
        }
        endMessage={
          <Alert status='info'>
            <AlertIcon />
            No more posts are available.
          </Alert>
        }
        dataLength={posts.length}
      >
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
      </InfiniteScroll>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { token } = parseCookies(context, 'token');
    const { data } = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 },
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
