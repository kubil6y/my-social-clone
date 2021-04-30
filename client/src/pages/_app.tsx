import '../styles.css';
import React from 'react';
import App from 'next/app';
import axios from 'axios';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components';
import { parseCookies, destroyCookie } from 'nookies';
import { baseUrl, redirectUser } from '../utils';

axios.defaults.withCredentials = true;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps: any = {};

    const protectedRoutes = [
      '/',
      '/[username]',
      '/notifications',
      '/post/[postId]',
      '/messages',
      '/search',
    ];

    const isProtectedRoute = protectedRoutes.includes(ctx.pathname);

    if (!token) {
      isProtectedRoute && redirectUser(ctx, '/login');
    } else {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      try {
        const { data } = await axios.get(`${baseUrl}/api/auth`);

        const { user, userFollowStats } = data;

        if (user) !isProtectedRoute && redirectUser(ctx, '/');

        pageProps.user = user;
        pageProps.userFollowStats = userFollowStats;
      } catch (error) {
        destroyCookie(ctx, 'token');
        redirectUser(ctx, '/login');
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ChakraProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    );
  }
}
export default MyApp;
