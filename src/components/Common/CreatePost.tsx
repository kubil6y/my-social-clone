import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { AiOutlineFileImage, AiOutlineSmile } from 'react-icons/ai';
import Image from 'next/image';
import { Picker } from 'emoji-mart';
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Icon,
  Textarea,
} from '@chakra-ui/react';

interface CreatePostProps {
  src: string;
}

export const CreatePost: React.FC<CreatePostProps> = ({ src }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');

  //emoji menu ref
  const ref = useRef(null);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
  };

  const handleEmojiSelect = (element: any) => {
    setText((state) => state + element.native);
  };

  useEffect(() => {
    /**
     * call function if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
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
        <Image src={src} alt='user profile picture' width={48} height={48} />
      </Center>

      <Box w='full'>
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
            rows={3}
            w='100%'
            resize='vertical'
            placeholder="What's happening?"
          />

          <Divider orientation='horizontal' />

          <Flex
            justifyContent='space-between'
            alignItems='center'
            px='0'
            py='1rem'
          >
            {/* icons */}
            <Flex>
              <Icon
                as={AiOutlineFileImage}
                h={6}
                w={6}
                color='blue.500'
                cursor='pointer'
              />

              <Icon
                as={AiOutlineSmile}
                h={6}
                w={6}
                color='blue.500'
                cursor='pointer'
                ml='15px'
                onClick={() => setShowEmoji((s) => !s)}
              />
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

          {showEmoji && <Picker onSelect={handleEmojiSelect} />}
        </form>
      </Box>
    </Flex>
  );
};
