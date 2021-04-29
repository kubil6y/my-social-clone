import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FooterMessage, HeaderMessage, InputWithIcon } from '../components';
import { Text, Icon, Container, VStack, Button, Alert } from '@chakra-ui/react';
import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUnlock,
} from 'react-icons/ai';
import { baseUrl, catchErrors } from '../utils';
import { useRouter } from 'next/router';

const initialState = {
  credentials: '',
  password: '',
};

interface loginProps {}

const login: React.FC<loginProps> = () => {
  const [state, setState] = useState(initialState);
  const { credentials, password } = state;
  const [errors, setErrors] = useState<any>(null);

  // ui states
  const [passwordType, setPasswordType] = useState('password');
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // important note,
  // name and value must be the same for onChange function to work
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`${baseUrl}/auth`, {
        credentials,
        password,
      });
      router.push('/');
    } catch (error) {
      setErrors(catchErrors(error));
    } finally {
      setIsLoading(false);
    }
  };

  const passwordIcon =
    passwordType === 'text' ? AiOutlineEyeInvisible : AiOutlineEye;
  const handleIconClick = () => {
    if (passwordType === 'password') setPasswordType('text');
    else setPasswordType('password');
  };

  useEffect(() => {
    const isValid = Object.values({
      credentials,
      password,
    }).every((el) => el.length !== 0);
    setDisabled(!isValid);
  }, [credentials, password]);

  return (
    <Container maxW="container.md" p="0">
      <HeaderMessage />

      <form onSubmit={handleSubmit}>
        <VStack spacing="1rem">
          <InputWithIcon
            id="credentials"
            type="text"
            icon={AiOutlineUser}
            placeholder="Enter email or username"
            label="Credentials*"
            helperText="We'll never share your email."
            name="credentials"
            value={credentials}
            onChange={handleChange}
            error={errors?.credentials}
          />

          <InputWithIcon
            id="password"
            type={passwordType}
            icon={passwordIcon}
            placeholder="Enter password"
            label="Password*"
            value={password}
            name="password"
            onChange={handleChange}
            handleIconClick={handleIconClick}
            error={errors?.password}
          />

          <Button
            type="submit"
            bg="blue.500"
            color="white"
            w="100%"
            _hover={{ bg: 'blue.600' }}
            _active={{ bg: 'blue.700' }}
            rounded="none"
            disabled={disabled}
            isLoading={isLoading}
          >
            Login
          </Button>
        </VStack>
      </form>

      <Alert status="info" mt="1rem">
        <Icon as={AiOutlineUnlock} h={4} w={4} color="blue.700" />
        <Link href="reset">
          <Text
            fontSize="xs"
            ml=".5rem"
            color="blue.600"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            Forget Password?
          </Text>
        </Link>
      </Alert>

      <FooterMessage
        text="New Member?"
        linkText="Register here."
        href="/register"
      />
    </Container>
  );
};

export default login;
