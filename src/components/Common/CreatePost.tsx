import React, { ChangeEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { Picker } from 'emoji-mart';
import { useClickOutside } from '../../hooks';
import {
  AiOutlineClose,
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
  Textarea,
  Tooltip,
} from '@chakra-ui/react';

interface CreatePostProps {
  userAvatar: string;
}

export const CreatePost: React.FC<CreatePostProps> = ({ userAvatar }) => {
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

  const imagePickerOpen = () => {
    hiddenInputRef.current.click();
  };

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMediaState({
      media: e.target.files[0],
      mediaPreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleImagePreviewCancel = () => {
    setMediaState((state: any) => ({
      ...state,
      //media: null,
      mediaPreview: null,
    }));

    //setMediaState({
    //media: null,
    //mediaPreview: null,
    //});
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
  };

  const handleEmojiSelect = (element: any) => {
    setText((state) => state + element.native);
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
        border='1px'
        borderColor='gray.100'
        py='4px'
        px='10px'
        mb='12px'
        alignItems='flex-start'
      >
        <Center
          rounded='full'
          overflow='hidden'
          mt='2px'
          mr='1rem'
          flexShrink={0}
        >
          <Image
            src={userAvatar}
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

            {/* image preview */}
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
                  onClick={handleImagePreviewCancel}
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
              <Box>
                <img
                  src={mediaPreview}
                  style={{
                    objectFit: 'cover',
                    maxWidth: '100%',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>

            <Divider orientation='horizontal' />

            <Flex
              justifyContent='space-between'
              alignItems='center'
              px='0'
              py='1rem'
            >
              {/* icons */}
              <Flex>
                <Center
                  p='7px'
                  _hover={{ bg: 'gray.200' }}
                  rounded='full'
                  cursor='pointer'
                >
                  <Icon
                    onClick={imagePickerOpen}
                    as={AiOutlineFileImage}
                    h={6}
                    w={6}
                    color='blue.500'
                  />
                </Center>

                <Box
                  position='relative'
                  p='7px'
                  ml='8px'
                  _hover={{ bg: 'gray.200' }}
                  rounded='full'
                  cursor='pointer'
                  onClick={() => setShowEmoji(true)}
                  ref={smileEmojiRef}
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
              </Flex>

              {/* button */}
              <Button
                type='submit'
                rounded='full'
                colorScheme='blue'
                letterSpacing='wide'
                textDecoration='uppercase'
              >
                send
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </>
  );
};
