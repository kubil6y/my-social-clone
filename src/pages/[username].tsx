import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { baseUrl, capitalize } from '../utils';
import { Post, Profile, User, UserFollowStats } from '../types';
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineCalendar,
} from 'react-icons/ai';
import { NoData, PostCard } from '../components';

interface ProfilePageProps {
  user: User;
  userData: User;
  profile: Profile;
  userFollowStats?: UserFollowStats;
  postsData: Post[];
}

// user is who is logged in
// userData is the user we fetch with params {username}
const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  userData,
  profile,
  postsData,
}) => {
  const router = useRouter();
  const { username } = router.query;

  const [posts, setPosts] = useState(postsData);
  const [showNoData, setShowNodata] = useState(true);

  // i render all social media links for this demo.
  // for optional rendering, you can use social?.twitter && ...
  //const { social } = profile;

  const hasAccess = username === user.username;

  React.useEffect(() => {
    setPosts(postsData);
  }, [username]);

  return (
    <>
      <Box height='200px' w='100%' bg='gray.300'></Box>
      <Flex
        alignItems='flex-start'
        justifyContent='space-between'
        p='12px'
        pb='0'
        position='relative'
      >
        <Box
          position='absolute'
          width='140px'
          height='140px'
          border='4px'
          borderColor='white'
          rounded='full'
          overflow='hidden'
          sx={{
            transform: 'translateY(-50%)',
            top: '0',
            left: '12px',
          }}
        >
          <Image src={userData?.profilePicUrl} width={140} height={140} />
        </Box>
        {hasAccess && (
          <Tooltip
            label='Work In Progress...'
            bg='gray.500'
            color='white'
            fontSize='xs'
          >
            <Button
              variant='outline'
              colorScheme='blue'
              rounded='full'
              ml='auto'
            >
              Edit profile
            </Button>
          </Tooltip>
        )}
        {!hasAccess && <Box h='40px' bg='transparent'></Box>}
      </Flex>
      <Box p='1rem' color='gray.500'>
        <Text fontSize='xl' fontWeight='bold' color='gray.800'>
          {userData.name}
        </Text>

        <Text fontSize='sm'>@{username}</Text>

        {profile?.bio && (
          <Box my='12px'>
            <Text fontSize='sm'>{profile.bio}</Text>
          </Box>
        )}

        <Flex alignItems='flex-end' mt='3px'>
          <Icon as={AiOutlineCalendar} h={6} w={6} />
          <Text ml='4px' fontSize='sm' mt='3px'>
            Joined {dayjs(user?.createdAt).format('MMM YYYY')}
          </Text>
        </Flex>

        {/* social links */}
        <Flex mt='8px'>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Tooltip label='Twitter' bg='gray.500' color='white'>
              <Center
                h='30px'
                w='30px'
                _hover={{ bg: 'gray.100' }}
                cursor='pointer'
                rounded='full'
                overflow='hidden'
              >
                <Icon color='blue.400' w={5} h={5} as={AiOutlineTwitter} />
              </Center>
            </Tooltip>
          </a>

          <a
            href='https://youtube.com'
            target='_blank'
            rel='noopener noreferrer'
            style={{ marginLeft: '3px', marginRight: '3px' }}
          >
            <Tooltip label='Youtube' bg='gray.500' color='white'>
              <Center
                h='30px'
                w='30px'
                _hover={{ bg: 'gray.100' }}
                cursor='pointer'
                rounded='full'
                overflow='hidden'
              >
                <Icon color='red.400' w={5} h={5} as={AiOutlineYoutube} />
              </Center>
            </Tooltip>
          </a>

          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            style={{ marginLeft: '3px', marginRight: '3px' }}
          >
            <Tooltip label='Instagram' bg='gray.500' color='white'>
              <Center
                h='30px'
                w='30px'
                _hover={{ bg: 'gray.100' }}
                cursor='pointer'
                rounded='full'
                overflow='hidden'
              >
                <Icon color='blue.400' w={5} h={5} as={AiOutlineInstagram} />
              </Center>
            </Tooltip>
          </a>

          <a
            href='http://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Tooltip label='Facebook' bg='gray.500' color='white'>
              <Center
                h='30px'
                w='30px'
                _hover={{ bg: 'gray.100' }}
                cursor='pointer'
                rounded='full'
                overflow='hidden'
              >
                <Icon color='purple.400' w={5} h={5} as={AiOutlineFacebook} />
              </Center>
            </Tooltip>
          </a>
        </Flex>
      </Box>
      <Divider orientation='horizontal' />
      {posts && posts.length > 0 ? (
        <Box>
          <Text fontWeight='bold' p='1rem'>
            {userData && `${capitalize(userData?.username)}'s posts`}
          </Text>
          <Divider orientation='horizontal' />
          {posts.map((post) => (
            <PostCard
              post={post}
              setPosts={setPosts}
              user={user}
              key={post._id}
            />
          ))}
        </Box>
      ) : (
        showNoData && (
          <NoData
            text={`${userData.username} has no posts.`}
            onClose={() => setShowNodata(false)}
          />
        )
      )}
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { username } = context.query;
    const { token } = parseCookies(context, 'token');
    const { data } = await axios.get(`${baseUrl}/api/posts/user/${username}`, {
      headers: { Authorization: token },
    });

    if (!data) {
      return {
        props: {
          error: true,
        },
      };
    }

    const { posts, profile, userData } = data;

    return {
      props: {
        userData,
        postsData: posts,
        profile,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
