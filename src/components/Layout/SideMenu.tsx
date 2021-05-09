import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '../../types';
import {
  AiOutlineHome,
  AiOutlineMail,
  AiFillMail,
  AiFillHome,
  AiFillBell,
  AiOutlineBell,
  AiOutlineLogout,
} from 'react-icons/ai';
import { GiDonkey } from 'react-icons/gi';
import { RiUserFill, RiUserLine } from 'react-icons/ri';
import { Box, Icon, Text } from '@chakra-ui/react';
import { logoutUser } from '../../actions';

interface SideMenuItemProps {
  icon: any;
  activeIcon?: any;
  text?: string;
  href: string;
  defaultColor?: string;
  pathname: string;
  [key: string]: {};
}

interface SideMenuProps {
  user: User;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  icon,
  activeIcon,
  text,
  href,
  defaultColor,
  pathname,
  ...restProps
}) => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <Link href={href}>
        <Box
          {...restProps}
          display='inline-flex'
          borderRadius='9999px'
          cursor='pointer'
          _hover={{ color: 'blue.500', bg: 'gray.100' }}
          alignItems='center'
          p='12px'
        >
          <Icon
            as={activeIcon && isActive(pathname) ? activeIcon : icon}
            color={isActive(pathname) ? 'blue.500' : defaultColor}
            h={7}
            w={7}
          />
          <Text
            fontSize='xl'
            fontWeight='bold'
            p={0}
            mx={5}
            color={isActive(pathname) && 'blue.500'}
          >
            {text}
          </Text>
        </Box>
      </Link>
      <Box></Box>
    </>
  );
};

export const SideMenu: React.FC<SideMenuProps> = ({ user }) => {
  const router = useRouter();
  const { username, unreadNotification, unreadMessage, email } = user;

  const messagesColor = unreadMessage && 'orange.500';
  const notificationsColor = unreadNotification && 'orange.500';

  return (
    <Box>
      <Box
        display='inline-flex'
        borderRadius='9999px'
        cursor='pointer'
        color='pink.500'
        _hover={{ color: 'blue.600', bg: 'gray.100' }}
        alignItems='center'
        p='12px'
        ml='2px'
        onClick={() => router.push('/')}
      >
        <Icon as={GiDonkey} h={7} w={7} color='blue.500' />
      </Box>
      <Box></Box>
      <SideMenuItem
        text='Home'
        href='/'
        pathname='/'
        icon={AiOutlineHome}
        activeIcon={AiFillHome}
      />

      <SideMenuItem
        text='Messages'
        href='/messages'
        pathname='/messages'
        icon={AiOutlineMail}
        activeIcon={AiFillMail}
        defaultColor={messagesColor}
      />

      <SideMenuItem
        text='Notifications'
        href='/notifications'
        pathname='/notifications'
        icon={AiOutlineBell}
        activeIcon={AiFillBell}
        defaultColor={notificationsColor}
      />

      <SideMenuItem
        text='Profile'
        href={`/${username.toLowerCase()}`}
        pathname='/[username]'
        icon={RiUserLine}
        activeIcon={RiUserFill}
      />

      <Box
        onClick={() => logoutUser(email)}
        display='inline-flex'
        borderRadius='9999px'
        cursor='pointer'
        _hover={{ color: 'blue.500', bg: 'gray.100' }}
        alignItems='center'
        p='12px'
      >
        <Icon as={AiOutlineLogout} h={7} w={7} />
        <Text fontSize='xl' fontWeight='bold' p={0} mx={5}>
          Logout
        </Text>
      </Box>
    </Box>
  );
};
