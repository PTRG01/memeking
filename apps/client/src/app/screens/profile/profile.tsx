import { Stack, Container } from '@mantine/core';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { usePostContext } from '../../contexts/post-provider/post-provider';
import ProfileHeader from '../../components/profile/profile-header/profile-header';
import ProfileTabs from '../../components/profile/profile-tabs/profile-tabs';
import LoaderComponent from '../../components/loader/loader';
import { useParams } from 'react-router-dom';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import { ProfileProvider } from '../../contexts/profile-provider/profile-provider';
import ProfileWrapper from '../../components/profile/profile-wrapper/profile-wrapper';

export function Profile() {
  const { user, isLoading, updateUserAvatar, updateUserBackground } =
    useAuthContext();
  const { userPostsList } = usePostContext();
  const { userId } = useParams();
  const { followingList } = useChatContext();
  const isCurrentUser = userId === user?.id;

  if (!user || !userId) return <div />;
  return (
    <Container>
      <Stack align="stretch" maw={1000}>
        <LoaderComponent isLoading={isLoading}>
          {isCurrentUser ? (
            <>
              <ProfileHeader
                user={user}
                userPostsList={userPostsList}
                onAvatarSubmit={updateUserAvatar}
                onBackgroundSubmit={updateUserBackground}
                isLoading={isLoading}
                isCurrentUser={isCurrentUser}
              />
              {userPostsList && (
                <ProfileTabs
                  user={user}
                  profilePostsList={userPostsList}
                  profileFollowingList={followingList}
                  isLoading={isLoading}
                  isCurrentUser
                />
              )}
            </>
          ) : (
            <ProfileProvider profileId={userId}>
              <ProfileWrapper />
            </ProfileProvider>
          )}
        </LoaderComponent>
      </Stack>
    </Container>
  );
}

export default Profile;
