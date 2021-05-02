import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineKey, AiFillSetting } from 'react-icons/ai';
import { GiDonkey } from 'react-icons/gi';
import {
  Box,
  Flex,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Icon,
  Center,
} from '@chakra-ui/react';

export const HeaderMessage = () => {
  const router = useRouter();

  const registerRoute = router.pathname === '/register';

  const heading = registerRoute ? 'Get Started' : 'Welcome Back';
  const text = registerRoute
    ? 'Create a new acccount'
    : 'Login with Email and Password';
  const icon = registerRoute ? AiFillSetting : AiOutlineKey;

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bg="blue.50"
        p=".5rem"
        mb="2rem"
      >
        <Flex alignItems="center" p="1rem">
          <Icon as={icon} h={16} w={16} color="blue.700" />
          <Box ml="1rem">
            <Heading size="lg">{heading}</Heading>
            <Text fontSize="sm" color="gray.600">
              {text}
            </Text>
          </Box>
        </Flex>
        <Link href="/">
          <Center
            _hover={{ bg: 'gray.200', cursor: 'pointer' }}
            minH={20}
            minW={20}
            rounded="full"
          >
            <Icon as={GiDonkey} h={12} w={12} color="blue.700" />
          </Center>
        </Link>
      </Flex>
    </>
  );
};

interface FooterMessageProps {
  text: string;
  linkText: string;
  href: string;
}

export const FooterMessage: React.FC<FooterMessageProps> = ({
  text,
  linkText,
  href,
}) => {
  return (
    <Alert status="info" mt="1rem" mb="6rem">
      <AlertIcon />
      <Text fontSize="xs">
        {text}{' '}
        <Link href={href}>
          <Text
            fontSize="xs"
            as="span"
            color="blue.600"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            {linkText}{' '}
          </Text>
        </Link>
      </Text>
    </Alert>
  );
};
