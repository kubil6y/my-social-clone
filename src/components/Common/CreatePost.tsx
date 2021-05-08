import React, { ChangeEvent, useState, useRef } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { Picker } from 'emoji-mart';
import { useClickOutside } from '../../hooks';
import { IoLocationOutline } from 'react-icons/io5';
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineFileImage,
  AiOutlineSmile,
} from 'react-icons/ai';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Input,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { User } from '../../types';

interface CreatePostProps {
  user: User;
  setPosts: Function;
}

export const CreatePost: React.FC<CreatePostProps> = ({ user, setPosts }) => {
  // image state
  const [{ media, mediaPreview }, setMediaState] = useState<any>({
    media: null,
    mediaPreview: null,
  });

  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');

  // for emoji box
  const hiddenInputRef = useRef(null);
  const emojiBoxRef = useRef(null);
  const smileEmojiRef = useRef(null);
  useClickOutside(emojiBoxRef, smileEmojiRef, () => setShowEmoji(false));

  // location field
  const [
    { locationValue, showLocationField, locationConfirmed },
    setLocation,
  ] = useState({
    locationValue: '',
    locationConfirmed: false,
    showLocationField: false,
  });

  // small states
  const isSendDisabled = text.length === 0;
  const locationConfirmActive = locationValue.length > 0;

  // refs
  const sendButtonRef = useRef<any>(null);
  const hiddenSendButtonRef = useRef<any>(null);

  const handleLocationConfirm = (e: any) => {
    if (e.target instanceof HTMLFormElement) e.preventDefault();
    if (locationConfirmActive) {
      setLocation((prev) => ({
        ...prev,
        locationConfirmed: true,
        showLocationField: false,
      }));
    } else {
      return;
    }
  };

  const handleImagePrevieRemove = () => {
    setMediaState((state: any) => ({
      ...state,
      media: null,
      mediaPreview: null,
    }));
  };

  // selecting emoji action
  const handleEmojiSelect = (element: any) => {
    setText((state) => state + element.native);
  };

  // image picker icon click
  const imagePickerOpen = () => {
    if (showLocationField) {
      setLocation((prev) => ({
        ...prev,
        showLocationField: false,
      }));
    }
    if (showEmoji) setShowEmoji(false);
    hiddenInputRef.current.click();
  };

  // location icon click
  const handleLocationClick = () => {
    if (showEmoji) setShowEmoji(false);
    //setShowLocationField((st) => !st);
    setLocation((prev) => ({
      ...prev,
      showLocationField: !showLocationField,
    }));
  };

  // smile icon click
  const handleSmileIconClick = () => {
    //setShowLocationField(false);
    setLocation((prev) => ({
      ...prev,
      showLocationField: false,
    }));

    // it doesnt have toggle functionality because of click outside stuff. TODO
    setShowEmoji(true);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let body: any = {};
    if (isSendDisabled) return;
    if (locationValue) body.locationValue = locationValue.trim();
    if (media) body.media = media;
    body.text = text.trim();

    // TODO mutate app state
    // go async
    // clean up component state
    console.log(body);
  };

  return (
    <>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={hiddenInputRef}
        onChange={(e) => {
          setMediaState({
            media: e.target.files[0],
            mediaPreview: URL.createObjectURL(e.target.files[0]),
          });
          e.target.value = null;
        }}
      />
      <Flex
        borderY='1px'
        borderColor='gray.100'
        py='4px'
        px='10px'
        alignItems='flex-start'
      >
        <Center
          rounded='full'
          overflow='hidden'
          mt='2px'
          mr='1rem'
          flexShrink={0}
          cursor='pointer'
          onClick={() => Router.push(`/${user.username}`)}
          _hover={{
            filter: 'opacity(.8)',
          }}
        >
          <Image
            src={user?.profilePicUrl}
            alt='user profile picture'
            width={48}
            height={48}
          />
        </Center>

        <Box flex={1}>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              borderColor='transparent'
              _hover={{ borderColor: 'transparent' }}
              _focus={{ borderColor: 'transparent' }}
              fontSize='20px'
              color='gray.700'
              maxLength={200}
              rows={2}
              w='100%'
              resize='vertical'
              placeholder="What's happening?"
            />
            <button
              type='submit'
              style={{ display: 'none' }}
              ref={hiddenSendButtonRef}
            />
          </form>

          {/* image preview */}
          {mediaPreview && (
            <Box
              display='block'
              w='100%'
              rounded='2xl'
              position='relative'
              overflow='hidden'
              shadow='lg'
              my='5px'
            >
              <Tooltip label='Remove'>
                <Box
                  onClick={handleImagePrevieRemove}
                  sx={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    zIndex: 10,
                  }}
                  p='5px'
                  overflow='hidden'
                  rounded='full'
                  cursor='pointer'
                  bg='gray.700'
                  _hover={{ bg: 'gray.600' }}
                >
                  <Icon as={AiOutlineClose} h={6} w={6} color='white' />
                </Box>
              </Tooltip>
              <Box w='100%'>
                <img
                  src={mediaPreview}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>
          )}

          <Divider orientation='horizontal' />

          <Flex
            justifyContent='space-between'
            alignItems='center'
            px='0'
            py='10px'
          >
            {/* icons */}
            <Flex alignItems='center'>
              <Center
                p='7px'
                _hover={{ bg: 'gray.200' }}
                rounded='full'
                cursor='pointer'
                onClick={imagePickerOpen}
              >
                <Icon as={AiOutlineFileImage} h={6} w={6} color='blue.500' />
              </Center>

              <Box
                position='relative'
                p='7px'
                ml='8px'
                _hover={{ bg: 'gray.200' }}
                rounded='full'
                cursor='pointer'
                ref={smileEmojiRef}
                onClick={handleSmileIconClick}
              >
                <Icon
                  as={AiOutlineSmile}
                  h={6}
                  w={6}
                  color='blue.500'
                  cursor='pointer'
                />

                {showEmoji && (
                  <Box
                    position='absolute'
                    sx={{ top: '2.5rem', left: '-5rem' }}
                    ref={emojiBoxRef}
                  >
                    <Picker onSelect={handleEmojiSelect} />
                  </Box>
                )}
              </Box>
              <Center
                ml='8px'
                p='7px'
                _hover={{ bg: 'gray.200' }}
                rounded='full'
                cursor='pointer'
                onClick={handleLocationClick}
              >
                <Icon as={IoLocationOutline} h={6} w={6} color='blue.500' />
              </Center>
            </Flex>

            <Box ml='auto' mr='1rem' fontStyle='oblique'>
              {locationConfirmed && (
                <Text color='gray.600' fontSize='sm'>
                  @{locationValue && locationValue.trim()}
                </Text>
              )}
            </Box>
            {/* button */}
            <Tooltip
              bg='red.500'
              color='white'
              label={isSendDisabled ? 'Text field must not be empty.' : ''}
            >
              <Button
                colorScheme='blue'
                bg={isSendDisabled ? 'blue.200' : 'blue.500'}
                _hover={{
                  bg: isSendDisabled ? 'blue.200' : 'blue.600',
                }}
                cursor={isSendDisabled ? 'auto' : 'pointer'}
                rounded='full'
                letterSpacing='wide'
                textDecoration='uppercase'
                ref={sendButtonRef}
                onClick={() => hiddenSendButtonRef.current.click()}
              >
                send
              </Button>
            </Tooltip>
          </Flex>

          {showLocationField && (
            <Flex>
              <form onSubmit={handleLocationConfirm}>
                <Input
                  placeholder='Enter your location'
                  size='md'
                  w='250px'
                  fontSize='md'
                  value={locationValue}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setLocation((prev) => ({
                        ...prev,
                        locationValue: '',
                        locationConfirmed: false,
                        showLocationField: false,
                      }));
                    }
                  }}
                  onChange={(e) =>
                    setLocation((prev) => ({
                      ...prev,
                      locationValue: e.target.value,
                    }))
                  }
                />
              </form>
              <Center
                ml='8px'
                p='7px'
                _hover={{ bg: 'gray.200' }}
                rounded='full'
                cursor='pointer'
                onClick={() => {
                  setLocation((prev) => ({
                    ...prev,
                    locationValue: '',
                    locationConfirmed: false,
                    showLocationField: false,
                  }));
                }}
              >
                <Icon as={AiOutlineCloseCircle} h={6} w={6} color='red.500' />
              </Center>

              <Tooltip
                bg='red.500'
                color='white'
                label={
                  !locationConfirmActive ? 'Enter a location to confirm' : ''
                }
              >
                <Center
                  ml='4px'
                  p='7px'
                  _hover={{ bg: 'gray.200' }}
                  rounded='full'
                  cursor={locationConfirmActive ? 'pointer' : 'cursor'}
                  onClick={handleLocationConfirm}
                >
                  <Icon as={AiOutlineCheck} h={6} w={6} color='blue.500' />
                </Center>
              </Tooltip>
            </Flex>
          )}
        </Box>
      </Flex>
      <Box height='12px' w='100%' bg='gray.50'></Box>
    </>
  );
};
