import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Social</title>
      </Head>

      <div>
        <h1>next app</h1>
        <Button colorScheme="blue">Button</Button>
        <Link href="/random">random</Link>
        <Link href="/another">another</Link>
      </div>
    </div>
  );
}
