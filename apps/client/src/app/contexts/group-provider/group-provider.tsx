import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useComment, useGroupList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { pb } from '../../utils/pocketbase';
import { IGroup, IGroupContext } from './group-provider.interface';

/* eslint-disable-next-line */
export interface IGroupProviderProps {
  children: React.ReactNode;
}

export const GroupContext = React.createContext<IGroupContext | null>(null);

export function GroupProvider({ children }: IGroupProviderProps) {
  const { user } = useAuthContext();
  const {
    getList,
    result: groupListResult,
    loading: isLoading,
  } = useGroupList();

  const [groups, setGroups] = useState<IGroup[] | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { createOne } = useComment();

  const loadGroups = useCallback(() => {
    getList({
      queryParams: {
        sort: 'created',
        expand: 'author_id,upvote_ids',
        filter: `users~"${user?.id}"`,
      },
    });
  }, [getList]);

  // useEffect(() => {
  //   loadComments();
  // }, [loadComments]);

  // useEffect(() => {
  //   pb.collection('comments').subscribe('*', async (e) => {
  //     loadComments();
  //   });
  // }, [loadComments, commentListResult]);

  // const createComment = (contentText: string) => {
  //   if (parentId && contentText)
  //     createOne({
  //       author_id: user?.id,
  //       post_id: parentId,
  //       contentText: contentText,
  //     });
  // };

  //  TODO ADD UPDATE AND DELETE FUNCTIONALITY

  return (
    <GroupContext.Provider
      value={{
        isLoading,
        groupListResult,
        isCreating,
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
