import React, { useEffect } from 'react';
import Router from 'next/router';
import nprogress from 'nprogress';
import { Container, useToast } from '@chakra-ui/react';
import { HeadTags, Navbar } from '../../components';
import { useNetworkState } from 'react-use';

export const Layout = ({ children }) => {
  Router.events.on('routeChangeStart', () => nprogress.start());
  Router.events.on('routeChangeComplete', () => nprogress.done());
  Router.events.on('routeChangeError', () => nprogress.done());

  const { online } = useNetworkState();
  const toast = useToast();
  useEffect(() => {
    const checkNetwork = () =>
      !online &&
      toast({
        title: 'No Internet Connection',
        description: 'Check your network settings and try again',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    checkNetwork();
  }, [online]);
  return (
    <>
      <HeadTags />
      <Navbar />
      <Container maxW="container.xl" pt="1rem" px="1rem">
        {children}
      </Container>
    </>
  );
};
