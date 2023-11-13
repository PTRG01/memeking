import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import { usePostList, usePost } from '../../hooks/pb-utils';
import { pb } from '../../utils/pocketbase';
import { useAuthContext } from '../auth-provider/auth-provider';
import { IPostContext } from './post-provider.interface';
import { IPostState, postReducer } from './post-reducer';
import { IPost } from './post-provider.interface';
const initialState: IPostState = {
  userPostsList: null,
  isLoading: false,
  error: null,
};

export const PostContext = React.createContext<IPostContext | null>(null);

export function PostProvider({ children }: React.PropsWithChildren) {
  const [{ isLoading, error }, dispatch] = useReducer(
    postReducer,
    initialState
  );
  const { user } = useAuthContext();

  // const { getList, result } = useUserList();
  // const { getOne, data: userData } = useUser(user?.id);
  const { getFullList, result: postListResult } = usePostList();
  const { createOne, deleteOne } = usePost();

  const userPostsList = postListResult as IPost[];
  // CHAT

  const loadPosts = useCallback(() => {
    if (user) {
      getFullList({
        sort: 'created',
        filter: `author_id~"${user?.id}"`,
      });
    }
  }, [user, getFullList]);

  useEffect(() => {
    loadPosts();
  }, [user?.id, loadPosts]);

  // useEffect(() => {
  //   if (postListResult)
  //     dispatch({
  //       type: 'UPDATE_POSTS_LIST',
  //       payload: postListResult as IPost[],
  //     });
  // }, [postListResult]);

  const createPost = (title: string, contentText: string) => {
    createOne({
      author_id: user?.id,
      avatar: user?.avatar,
      title: title,
      contentText: contentText,
    });
  };

  useEffect(() => {
    pb.collection('posts').subscribe('*', async (e) => {
      loadPosts();
    });
  }, [userPostsList, loadPosts]);

  const deletePost = (id: string) => {
    deleteOne(id);
  };

  // const handleOpenChatToggle: THandleOpenChatToggleFunction = (id) => {
  //   dispatch({ type: 'UPDATE_OPEN_CHATS', payload: id });
  // };

  // UPDATE USERS FOLLOWING LIST

  // const handleAddFollowing = (id: string): void => {
  //   updateCurrentUser({
  //     followers: [...(user?.followers as string[]), id],
  //   });
  // };
  // const handleRemoveFollowing = (id: string): Promise<void> =>
  //   updateCurrentUser({
  //     followers: user?.followers.filter((follower: string) => follower !== id),
  //   });

  return (
    <PostContext.Provider
      value={{
        isLoading,
        userPostsList,
        createPost,
        deletePost,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePostContext = () => {
  const data = useContext(PostContext);

  if (!data) {
    throw Error('usePostContext should be used inside of PostProvider');
  }

  return data;
};
