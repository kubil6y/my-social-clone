import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import nprogress from 'nprogress';
import { useNetworkState } from 'react-use';
import { Container, useToast, Grid, Box } from '@chakra-ui/react';
import {
  Sticky,
  HeadTags,
  Navbar,
  SideMenu,
  SearchBar,
  Suggestions,
} from '../../components';
import { useMediaQuery } from '@chakra-ui/react';

export const Layout = ({ children, user }) => {
  const [isBig, setIsBig] = useState(false);
  const [isLargerThan1200px] = useMediaQuery('(min-width: 1200px)');
  const [isLargerThan1000px] = useMediaQuery('(min-width: 1000px)');
  const [isLargerThan420px] = useMediaQuery('(min-width: 420px)');

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

  useEffect(() => {
    if (isLargerThan1200px) {
      setIsBig(true);
    } else {
      setIsBig(false);
    }
  }, [isLargerThan1200px]);
  return (
    <>
      <HeadTags />

      {user ? (
        <>
          {isBig ? (
            <>
              <Container maxW='container.xl'>
                <Grid
                  templateColumns={
                    isLargerThan1200px ? '2.5fr 6fr 4fr' : '60px 5fr 2fr'
                  }
                  gap={2}
                >
                  <Sticky>
                    <SideMenu user={user} />
                  </Sticky>
                  <Box border='1px' borderColor='gray.100' mb='2rem' w='100%'>
                    {children}
                  </Box>
                  <Sticky>
                    <SearchBar />
                    <Suggestions />
                  </Sticky>
                </Grid>
              </Container>
            </>
          ) : isLargerThan1000px ? (
            <>
              <Container maxW='container.xl'>
                <Grid
                  templateColumns={
                    isLargerThan1200px ? '2.5fr 6fr 4fr' : '60px 5fr 2fr'
                  }
                  gap={2}
                >
                  <Sticky>
                    <SideMenu user={user} />
                  </Sticky>
                  <Box border='1px' borderColor='gray.100' mb='2rem' w='100%'>
                    {children}
                  </Box>
                  <Sticky>
                    <SearchBar />
                    <Suggestions />
                  </Sticky>
                </Grid>
              </Container>
            </>
          ) : isLargerThan420px ? (
            <>
              <Container maxW='container.xl'>
                <Grid templateColumns='50px 1fr' gap={2}>
                  <Sticky>
                    <SideMenu user={user} />
                  </Sticky>
                  <Box border='1px' borderColor='gray.100' mb='2rem' w='100%'>
                    <SearchBar />
                    {children}
                  </Box>
                </Grid>
              </Container>
            </>
          ) : (
            <>
              <Container maxW='container.sm'></Container>
              <SideMenu user={user} />
              <Box border='1px' borderColor='gray.100' mb='2rem' w='100%'>
                <SearchBar />
                {children}
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          <Navbar />
          <Container maxW='container.xl' pt='1rem' px='1rem'>
            {children}
          </Container>
        </>
      )}
    </>
  );
};
