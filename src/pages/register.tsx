import React, { useState, useRef, useEffect, FormEvent } from 'react';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineTags,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from 'react-icons/ai';
import {
  Container,
  Button,
  VStack,
  Textarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import {
  SocialSection,
  FooterMessage,
  HeaderMessage,
  InputWithIcon,
  ImageCropper,
} from '../components';
import { catchErrors, uploadPic } from '../utils';
import { registerUser } from '../actions';

const initialState = {
  name: '',
  email: '',
  username: '',
  password: '',
  bio: '',
  facebook: '',
  youtube: '',
  instagram: '',
  twitter: '',
};

interface registerProps {}

const register: React.FC<registerProps> = () => {
  const [user, setUser] = useState(initialState);
  const {
    name,
    email,
    password,
    username,
    bio,
    facebook,
    youtube,
    twitter,
    instagram,
  } = user;
  const [errors, setErrors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // password icon stuff
  const [passwordType, setPasswordType] = useState('password');
  const passwordIcon =
    passwordType === 'text' ? AiOutlineEyeInvisible : AiOutlineEye;
  const handleIconClick = () => {
    if (passwordType === 'password') setPasswordType('text');
    else setPasswordType('password');
  };

  const [media, setMedia] = useState(null);
  const inputRef = useRef();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let profilePicUrl: string;

    try {
      if (media) {
        profilePicUrl = await uploadPic(media);
      }
      await registerUser(user, profilePicUrl, setIsLoading, setErrors);
    } catch (error) {
      setErrors(catchErrors(error));
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isValid = Object.values({
      name,
      email,
      password,
      bio,
      username,
    }).every((el) => el.length !== 0);
    setDisabled(!isValid);
  }, [name, email, password, bio]);

  return (
    <Container maxW='container.md' p='0'>
      <HeaderMessage />

      <input type='file' style={{ display: 'none' }} ref={inputRef} />
      <ImageCropper setMedia={setMedia} />

      <form onSubmit={handleSubmit}>
        <VStack spacing='1rem'>
          <InputWithIcon
            icon={AiOutlineUser}
            id='name'
            label='Name*'
            placeholder='Enter your name'
            name='name'
            value={name}
            type='text'
            onChange={handleChange}
            required={true}
            error={errors?.name}
          />

          <InputWithIcon
            icon={AiOutlineMail}
            id='email'
            label='Email*'
            placeholder='Enter your email'
            name='email'
            value={email}
            type='email'
            onChange={handleChange}
            required={true}
            error={errors?.email}
          />

          <InputWithIcon
            icon={passwordIcon}
            id='password'
            label='Password*'
            placeholder='Enter your password'
            name='password'
            value={password}
            type={passwordType}
            onChange={handleChange}
            handleIconClick={handleIconClick}
            required={true}
            error={errors?.password}
          />

          <InputWithIcon
            icon={AiOutlineTags}
            id='username'
            label='Username*'
            placeholder='Enter your username'
            name='username'
            value={username}
            type='text'
            onChange={handleChange}
            error={errors?.username}
          />

          <FormControl>
            <FormLabel mb='5px'>Bio*</FormLabel>
            <Textarea
              placeholder='Enter your bio'
              name='bio'
              value={bio}
              onChange={handleChange}
            />
          </FormControl>

          <SocialSection
            facebook={facebook}
            youtube={youtube}
            instagram={instagram}
            twitter={twitter}
            handleChange={handleChange}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
          />

          <Button
            type='submit'
            bg='blue.500'
            color='white'
            w='100%'
            _hover={{ bg: 'blue.600' }}
            _active={{ bg: 'blue.700' }}
            rounded='none'
            disabled={disabled}
            isLoading={isLoading}
          >
            Register
          </Button>
        </VStack>
      </form>

      <FooterMessage
        text='Already Member?'
        linkText='Login here.'
        href='/login'
      />
    </Container>
  );
};

export default register;
