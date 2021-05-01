import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '../../types';
import {
  AiOutlineHome,
  AiOutlineSmile,
  AiOutlineMail,
  AiFillMail,
  AiFillHome,
  AiFillBell,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
} from 'react-icons/ai';
import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { logoutUser } from '../../actions';

interface SideMenuItemProps {
  icon: any;
  activeIcon?: any;
  text?: string;
  href: string;
  defaultColor?: string;
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
  ...restProps
}) => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <Link href={href}>
        <Box
          {...restProps}
          display="inline-flex"
          borderRadius="9999px"
          cursor="pointer"
          _hover={{ color: 'blue.500', bg: 'gray.100' }}
          color={isActive(href) ? 'blue.500' : defaultColor}
          alignItems="center"
          p="12px"
        >
          <Icon
            as={activeIcon && isActive(href) ? activeIcon : icon}
            h={7}
            w={7}
          />
          <Text fontSize="xl" fontWeight="bold" p={0} mx={5}>
            {text}
          </Text>
        </Box>
      </Link>
      <Box></Box>
    </>
  );
};

export const SideMenu: React.FC<SideMenuProps> = ({ children, user }) => {
  const { username, unreadNotification, unreadMessage, email } = user;

  const messagesColor = unreadMessage && 'orange.500';
  const notificationsColor = unreadNotification && 'orange.500';

  return (
    <Box>
      <Box
        display="inline-flex"
        borderRadius="9999px"
        cursor="pointer"
        color="pink.500"
        _hover={{ color: 'pink.600', bg: 'gray.100' }}
        alignItems="center"
        p="12px"
      >
        <Icon as={AiOutlineSmile} h={7} w={7} />
      </Box>
      <Box></Box>
      <SideMenuItem
        text="Home"
        href="/"
        icon={AiOutlineHome}
        activeIcon={AiFillHome}
      />

      <SideMenuItem
        text="Messages"
        href="/messages"
        icon={AiOutlineMail}
        activeIcon={AiFillMail}
        defaultColor={messagesColor}
      />

      <SideMenuItem
        text="Notifications"
        href="/notifications"
        icon={AiOutlineBell}
        activeIcon={AiFillBell}
        defaultColor={notificationsColor}
      />

      <SideMenuItem
        text="Home"
        href={`/${username.toLowerCase()}`}
        icon={AiOutlineUser}
      />

      <Box
        onClick={() => logoutUser(email)}
        display="inline-flex"
        borderRadius="9999px"
        cursor="pointer"
        _hover={{ color: 'blue.500', bg: 'gray.100' }}
        alignItems="center"
        p="12px"
      >
        <Icon as={AiOutlineLogout} h={7} w={7} />
        <Text fontSize="xl" fontWeight="bold" p={0} mx={5}>
          Logout
        </Text>
      </Box>
    </Box>
  );
};
