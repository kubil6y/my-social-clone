import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import { PageProps } from '../types';
import { capitalize } from '../utils';

export default function Home({ user, userFollowStats }: PageProps) {
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

      <div>
        <h1>next app</h1>
        <Button colorScheme="blue">Button</Button>
        <br />
        <Link href="/login">login</Link>
        <br />
        <Link href="/register">register</Link>
      </div>
    </div>
  );
}
