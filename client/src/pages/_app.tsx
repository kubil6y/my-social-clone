import '../styles.css';
import React from 'react';
import axios from 'axios';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components';
import { QueryClient, QueryClientProvider } from 'react-query';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </ChakraProvider>
  );
}
