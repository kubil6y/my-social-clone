import React, { useEffect } from 'react';
import Router from 'next/router';
import nprogress from 'nprogress';
import { useNetworkState } from 'react-use';
import { PageProps } from '../../types';
import { Container, useToast, Grid, Box } from '@chakra-ui/react';
import {
  Sticky,
  HeadTags,
  Navbar,
  SideMenu,
  SearchBar,
} from '../../components';

export const Layout = ({ children, user }: PageProps) => {
  // nprogress setup
  Router.events.on('routeChangeStart', () => nprogress.start());
  Router.events.on('routeChangeComplete', () => nprogress.done());
  Router.events.on('routeChangeError', () => nprogress.done());

  // offline warning setup
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

      {user ? (
        <>
          <Container maxW="container.xl">
            <Grid templateColumns="2.5fr 6.5fr 3.5fr" gap={4}>
              <Sticky>
                <SideMenu user={user} />
              </Sticky>
              <Box w="100%" bg="green.500" h="2000px">
                <SearchBar />
                MAIN FEED
              </Box>
              <Sticky>
                <SearchBar />
              </Sticky>
            </Grid>
          </Container>
        </>
      ) : (
        <>
          <Navbar />
          <Container maxW="container.xl" pt="1rem" px="1rem">
            {children}
          </Container>
        </>
      )}
    </>
  );
};
