import React, { useCallback, useContext, useEffect } from 'react';
import { useGroupList, usePost, usePostList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { pb } from '../../utils/pocketbase';
import { IFeedContext } from './feed-provider.interface';
import { usePostContext } from '../post-provider/post-provider';
import { useGroupContext } from '../group-provider/group-provider';

/* eslint-disable-next-line */
export interface IFeedProviderProps {
  children: React.ReactNode;
}

export const FeedContext = React.createContext<IFeedContext | null>(null);

export function FeedProvider({ children }: IFeedProviderProps) {
  const { user } = useAuthContext();
  const { userPostsList: postsListResult, isLoading } = usePostContext();
  const { groupListResult } = useGroupContext();
  const {
    getList,
    // result: postsListResult,
  } = usePostList();

  const { createOne: createOnePost } = usePost();

  const currentGroupsIds = groupListResult?.map((group) => group.id);

  // const loadGroupsPosts = useCallback(() => {
  //   getList({
  //     queryParams: {
  //       sort: 'created',
  //       expand: 'author_id',
  //       filter: `group_id~"${currentGroupsIds}"`,
  //     },
  //   });
  // }, [getList, currentGroupsIds]);

  // useEffect(() => {
  //   loadGroupsPosts();
  // }, [loadGroupsPosts]);

  // useEffect(() => {
  //   pb.collection('posts').subscribe('*', async (e) => {
  //     loadGroupsPosts();
  //   });
  // }, [loadGroupsPosts, postsListResult]);

  // useEffect(() => {
  //   console.log(userPostsList);
  // }, [userPostsList]);

  const createGroupPost = (contentText: string, groupId: string) => {
    createOnePost({
      author_id: user?.id,
      contentText: contentText,
      group_id: groupId,
    });
  };

  return (
    <FeedContext.Provider
      value={{
        isLoading,
        groupListResult,
        postsListResult,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeedContext = () => {
  const data = useContext(FeedContext);

  if (!data) {
    throw Error('useFeedContext should be used inside of FeedProvider');
  }

  return data;
};
