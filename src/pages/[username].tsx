import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { simulateMouseClick } from '../utils';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    simulateMouseClick(document.querySelector('#onepx'));
  }, [username]);

  return (
    <div>
      <Box id="onepx" w="1px" h="1px" bg="transparent" />
      <h1>merhaba</h1>
      <p>[username]: {username}</p>
    </div>
  );
};

export default ProfilePage;
