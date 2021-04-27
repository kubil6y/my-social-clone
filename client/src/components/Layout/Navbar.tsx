import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon, Flex, Text, Container } from '@chakra-ui/react';
import { AiOutlineSave, AiOutlineLogin } from 'react-icons/ai';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <Container maxW="container.md" p="0">
      <Flex>
        <Link href="login">
          <Flex
            _hover={{
              backgroundColor: isActive('/login') ? 'blue.100' : 'blue.50',
            }}
            cursor="pointer"
            width="100%"
            alignItems="center"
            justifyContent="center"
            bg={isActive('/login') ? 'blue.100' : 'white'}
            p="1rem"
          >
            <Icon as={AiOutlineLogin} h={6} w={6} />
            <Text
              fontSize="md"
              ml=".5rem"
              textTransform="uppercase"
              fontWeight={isActive('/login') ? 'bold' : 'normal'}
            >
              login
            </Text>
          </Flex>
        </Link>
        <Link href="/register">
          <Flex
            _hover={{
              backgroundColor: isActive('/register') ? 'blue.100' : 'blue.50',
            }}
            cursor="pointer"
            width="100%"
            alignItems="center"
            justifyContent="center"
            p="1rem"
            bg={isActive('/register') ? 'blue.100' : 'white'}
          >
            <Icon as={AiOutlineSave} h={6} w={6} />
            <Text
              fontSize="md"
              ml=".5rem"
              textTransform="uppercase"
              fontWeight={isActive('/register') ? 'bold' : 'normal'}
            >
              Register
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Container>
  );
};
