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
import {
  Box,
  Icon,
  Text,
  Tooltip,
  useMediaQuery,
  Flex,
} from '@chakra-ui/react';
import { logoutUser } from '../../actions';

interface SideMenuItemProps {
  icon: any;
  activeIcon?: any;
  text?: string;
  href?: string;
  tooltipLabel?: string;
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
  tooltipLabel,
  ...restProps
}) => {
  const [isBig, setIsBig] = React.useState(false);
  const [isLargerThan1000px] = useMediaQuery('(min-width: 1000px)');
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  React.useEffect(() => {
    if (isLargerThan1000px) {
      setIsBig(true);
    } else {
      setIsBig(false);
    }
  }, [isLargerThan1000px]);

  return (
    <>
      {href ? (
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
            {isBig && (
              <Text
                fontSize='xl'
                fontWeight='bold'
                p={0}
                mx={5}
                color={isActive(pathname) && 'blue.500'}
              >
                {text}
              </Text>
            )}
          </Box>
        </Link>
      ) : (
        <Tooltip label={tooltipLabel} bg='gray.500' color='white' fontSize='xs'>
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
            {isBig && (
              <Text
                fontSize='xl'
                fontWeight='bold'
                p={0}
                mx={5}
                color='gray.300'
              >
                {text}
              </Text>
            )}
          </Box>
        </Tooltip>
      )}
      <Box></Box>
    </>
  );
};

export const SideMenu: React.FC<SideMenuProps> = ({ user }) => {
  const [isLarge, setIsLarge] = React.useState(false);
  const [isSmall, setIsSmall] = React.useState(false);

  const [isLargerThan1000px] = useMediaQuery('(min-width: 1000px)');
  const [isLargerThan420px] = useMediaQuery('(min-width: 420px)');
  const router = useRouter();
  const { username, email } = user;

  //const messagesColor = unreadMessage && 'orange.500';
  //const notificationsColor = unreadNotification && 'orange.500';

  const messagesColor = 'gray.300';
  const notificationsColor = 'gray.300';

  React.useEffect(() => {
    if (isLargerThan1000px) {
      setIsLarge(true);
    } else {
      setIsLarge(false);
    }
  }, [isLargerThan1000px]);

  React.useEffect(() => {
    if (isLargerThan420px) {
      setIsSmall(false);
    } else {
      setIsSmall(true);
    }
  }, [isLargerThan1000px]);

  return (
    <Flex
      flexDir={isSmall ? 'row' : 'column'}
      sx={
        isSmall && {
          zIndex: '10',
          bg: 'white',
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          justifyContent: 'space-evenly',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
        }
      }
    >
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
        tooltipLabel='Work In Progress...'
        pathname='/messages'
        icon={AiOutlineMail}
        activeIcon={AiFillMail}
        defaultColor={messagesColor}
      />

      <SideMenuItem
        text='Notifications'
        tooltipLabel='Work In Progress...'
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
        {isLarge && (
          <Text fontSize='xl' fontWeight='bold' p={0} mx={5}>
            Logout
          </Text>
        )}
      </Box>
    </Flex>
  );
};
