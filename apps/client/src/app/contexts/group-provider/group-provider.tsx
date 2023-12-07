import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  useComment,
  useGroup,
  useGroupList,
  usePost,
  usePostList,
} from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { pb } from '../../utils/pocketbase';
import { IGroup, IGroupContext } from './group-provider.interface';

/* eslint-disable-next-line */
export interface IGroupProviderProps {
  children: React.ReactNode;
  parentId?: string;
}

export const GroupContext = React.createContext<IGroupContext | null>(null);

export function GroupProvider({ children, parentId }: IGroupProviderProps) {
  const { user } = useAuthContext();
  const {
    getList,
    result: groupListResult,
    loading: isLoading,
  } = useGroupList();
  const {
    getList: getPostList,
    result: groupPostsListResult,
    loading: isPostsLoading,
  } = usePostList();
  const { createOne } = useGroup();
  const { createOne: createOnePost } = usePost();
  const [isCreating, setIsCreating] = useState(false);

  const loadGroups = useCallback(() => {
    getList({
      queryParams: {
        sort: 'created',
        expand: 'author_id,upvote_ids',
        filter: `author_id~"${user?.id}"`,
      },
    });
  }, [getList, user]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  useEffect(() => {
    pb.collection('groups').subscribe('*', async (e) => {
      loadGroups();
    });
  }, [loadGroups, groupListResult]);

  const loadGroupPosts = useCallback(() => {
    getPostList({
      queryParams: {
        sort: 'created',
        expand: 'author_id,users',
        filter: `group_id~"${parentId}"`,
      },
    });
  }, [getPostList, parentId]);

  useEffect(() => {
    loadGroupPosts();
  }, [loadGroupPosts]);

  useEffect(() => {
    pb.collection('posts').subscribe('*', async (e) => {
      loadGroupPosts();
    });
  }, [loadGroupPosts, groupPostsListResult]);

  const createGroup = (title: string, users: string[]) => {
    if (title && users)
      createOne({
        author_id: user?.id,
        users: users,
        title: title,
      });
  };

  const createFirstPost = () => {
    createOnePost({
      author_id: user?.id,
    });
  };

  //  TODO ADD UPDATE AND DELETE FUNCTIONALITY

  return (
    <GroupContext.Provider
      value={{
        isLoading,
        groupListResult,
        isCreating,
        createGroup,
        groupPostsListResult,
        isPostsLoading,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export const useGroupContext = () => {
  const data = useContext(GroupContext);

  if (!data) {
    throw Error('useGroupContext should be used inside of GroupProvider');
  }

  return data;
};
