import React, { useCallback, useContext, useEffect } from 'react';
import { usePostList, useUserList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { IProfileContext } from './profile-provider.interface';
import { IUser } from '../auth-provider/auth-provider.interface';

export const ProfileContext = React.createContext<IProfileContext | null>(null);

export interface IProfileProviderProps {
  children: React.ReactNode;
  profileId: string;
}

export function ProfileProvider({
  children,
  profileId,
}: IProfileProviderProps) {
  const { user } = useAuthContext();
  const {
    getFullList,
    result: profilePostsList,
    loading: isLoading,
  } = usePostList();

  const { getList, result: userListResult } = useUserList();
  const profileUser = userListResult?.find(
    (user) => user?.id === profileId
  ) as IUser;
  const profileFollowingList =
    userListResult &&
    userListResult?.flatMap((user) => user.expand?.followers as IUser[]);

  const loadUser = useCallback(() => {
    if (profileId) {
      getList({
        queryParams: {
          sort: 'created',
          expand: 'followers',
          filter: `id~"${profileId}"`,
        },
      });
    }
  }, [profileId, getList]);

  const loadPosts = useCallback(() => {
    if (user) {
      getFullList({
        sort: 'created',
        expand: 'upvote_ids, author_id',
        filter: `author_id~"${profileId}"`,
      });
    }
  }, [user, getFullList, profileId]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // useEffect(() => {
  //   pb.collection('posts').subscribe('*', async (e) => {
  //     loadPosts();
  //   });
  // }, [loadPosts, userPostsList]);

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        profileUser,
        profilePostsList,
        profileFollowingList,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfileContext = () => {
  const data = useContext(ProfileContext);

  if (!data) {
    throw Error('useProfileContext should be used inside of ProfileProvider');
  }

  return data;
};
