import { useProfileContext } from '../../../contexts/profile-provider/profile-provider';
import ProfileHeader from '../profile-header/profile-header';
import ProfileTabs from '../profile-tabs/profile-tabs';

export function ProfileWrapper() {
  const { profileUser, profilePostsList, profileFollowingList, isLoading } =
    useProfileContext();
  if (!profileUser || !profilePostsList) return <div />;
  return (
    <>
      <ProfileHeader
        user={profileUser}
        userPostsList={profilePostsList}
        isLoading={isLoading}
        isCurrentUser={false}
      />
      <ProfileTabs
        user={profileUser}
        profilePostsList={profilePostsList}
        profileFollowingList={profileFollowingList}
        isLoading={isLoading}
        isCurrentUser={false}
      />
    </>
  );
}

export default ProfileWrapper;
