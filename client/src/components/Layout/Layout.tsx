import Router from 'next/router';
import nprogress from 'nprogress';
import { Container } from '@chakra-ui/react';
import { HeadTags, Navbar } from '../../components';

export const Layout = ({ children }) => {
  Router.events.on('routeChangeStart', () => nprogress.start());
  Router.events.on('routeChangeComplete', () => nprogress.done());
  Router.events.on('routeChangeError', () => nprogress.done());

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
