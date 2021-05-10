import React from 'react';
import Image from 'next/image';
import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react';

const data = [
  {
    name: 'Kubilay 🇦🇱',
    username: 'kubil6y',
    img:
      'https://pbs.twimg.com/profile_images/1391675297104338945/kN0Tu11C_400x400.jpg',
    desc: 'Please contact me for more information.',
    pos: 'top',
  },

  {
    name: 'ThePrimeagen',
    username: 'theprimeagen',
    img:
      'https://pbs.twimg.com/profile_images/1389947058698719232/yd2ypjMw_400x400.jpg',
    desc: 'Vimstigator',
    pos: 'middle',
  },

  {
    name: 'MelkeyDev',
    username: 'melkeydev',
    img:
      'https://pbs.twimg.com/profile_images/1362399469799628801/NRQH8TYL_400x400.jpg',
    desc: 'Twitch Streamer in Sci & TechAlien monster twitch.tv/melkeydev',
    pos: 'middle',
  },

  {
    name: 'Classsed',
    username: 'classsed',
    img:
      'https://pbs.twimg.com/profile_images/1110481640638291969/X5RhPbjg_400x400.jpg',
    desc:
      'A classroom full of visionaries, mavericks, a class for ones that build their own future, a class for you.',
    pos: 'bottom',
  },
];

interface ISuggestion {
  name: string;
  username: string;
  img: string;
  desc: string;
  pos: string;
}

interface SuggestionItemProps {
  suggestion: ISuggestion;
}

export const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
}) => {
  const { name, username, img, desc, pos } = suggestion;

  return (
    <>
      <a
        href={`https://twitter.com/${username}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Flex
          overflow='hidden'
          onClick={() => console.log('image clicked')}
          p='1rem'
          fontSize='sm'
          cursor='pointer'
          _hover={{
            bg: 'gray.200',
          }}
        >
          <Center
            overflow='hidden'
            rounded='full'
            w='50px'
            h='50px'
            flexShrink={0}
          >
            <Image src={img} width='50px' height='50px' />
          </Center>

          <Box ml='1rem'>
            <Flex alignItems='center'>
              <Text fontWeight='bold' fontSize='lg'>
                {name}
              </Text>
              <Text color='gray.500' ml='6px'>
                @{username}
              </Text>
            </Flex>
            <Text color='gray.600'>{desc}</Text>
          </Box>
        </Flex>
      </a>
      <Divider orientation='horizontal' />
    </>
  );
};

export const Suggestions: React.FC = () => {
  return (
    <Box bg='gray.50' overflow='hidden' rounded='3xl' mt='1rem'>
      <Text fontWeight='bold' p='1rem' fontSize='xl'>
        Suggestions
      </Text>
      <Divider orientation='horizontal' />
      {data.map((suggestion) => (
        <SuggestionItem key={suggestion.username} suggestion={suggestion} />
      ))}
    </Box>
  );
};
