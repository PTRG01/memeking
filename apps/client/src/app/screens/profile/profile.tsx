import { Stack, Container } from '@mantine/core';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { usePostContext } from '../../contexts/post-provider/post-provider';
import ProfileHeader from '../../components/profile/profile-header/profile-header';
import ProfileTabs from '../../components/profile/profile-tabs/profile-tabs';

export function Profile() {
  const { user } = useAuthContext();
  const { userPostsList } = usePostContext();

  if (!user) return;
  return (
    <Container>
      <Stack align="stretch" maw={1000}>
        <ProfileHeader user={user} userPostsList={userPostsList} />
        {userPostsList && (
          <ProfileTabs user={user} userPostsList={userPostsList} />
        )}
      </Stack>
    </Container>
  );
}

export default Profile;
