import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { PageProps } from '../types';

export default function Home({ user, userFollowStats }: PageProps) {
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
