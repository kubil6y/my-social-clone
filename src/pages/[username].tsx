import { useRouter } from 'next/router';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div>
      <p>[username]: {username}</p>
    </div>
  );
};

export default ProfilePage;
