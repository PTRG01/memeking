import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useComment, useGroupList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { pb } from '../../utils/pocketbase';
import { IGroup, IGroupContext } from './group-provider.interface';

/* eslint-disable-next-line */
export interface IGroupProviderProps {
  children: React.ReactNode;
  parentId: string;
}

export const GroupContext = React.createContext<IGroupContext | null>(null);

export function CommentProvider({ children, parentId }: IGroupProviderProps) {
  const { user } = useAuthContext();
  const {
    getList,
    result: commentListResult,
    loading: isLoading,
  } = useGroupList();

  const [groups, setGroups] = useState<IGroup[] | null>(null);

  const { createOne } = useComment();

  const loadComments = useCallback(() => {
    getList({
      queryParams: {
        sort: 'created',
        expand: 'author_id,upvote_ids',
        filter: `post_id~"${parentId}"`,
      },
    });
  }, [parentId, getList]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    pb.collection('comments').subscribe('*', async (e) => {
      loadComments();
    });
  }, [loadComments, commentListResult]);

  const createComment = (contentText: string) => {
    if (parentId && contentText)
      createOne({
        author_id: user?.id,
        post_id: parentId,
        contentText: contentText,
      });
  };

  //  TODO ADD UPDATE AND DELETE FUNCTIONALITY

  return (
    <GroupContext.Provider
      value={{
        isLoading,
        groups,
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
