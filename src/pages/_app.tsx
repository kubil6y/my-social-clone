import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import axios from 'axios';
import App from 'next/app';
import dayjs from 'dayjs';
import { parseCookies, destroyCookie } from 'nookies';
import { baseUrl } from '../utils';
import { redirectUser } from '../actions';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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
      // user is not logged in
      destroyCookie(ctx, 'token');
      isProtectedRoute && redirectUser(ctx, '/login');
    } else {
      // user logged in
      if (Component.getInitialProps) {
        // we will only wait for this, if there is a user.
        // pageProps will only be available in protectedRoutes.
        pageProps = await Component.getInitialProps(ctx);
      }

      try {
        const { data } = await axios.get(`${baseUrl}/api/auth`, {
          headers: { Authorization: token },
        });

        const { user, userFollowStats } = data;

        // if there is user (logged in)
        // and user tries to hit /login or /register (unprotected routes)
        // redirect to main '/'
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
