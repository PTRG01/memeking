import { IUser } from '../auth-provider/auth-provider.interface';
import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import {
  useChat,
  useChatList,
  useUser,
  useUserList,
} from '../../hooks/pb-utils';
import { pb } from '../../utils/pocketbase';
import { useAuthContext } from '../auth-provider/auth-provider';
import {
  IChat,
  IChatContext,
  THandleClearOpenChatsFunction,
  THandleOpenChatToggleFunction,
} from './chat-provider.interface';
import { IChatState, chatReducer } from './chat-reducer';

const initialState: IChatState = {
  user: null,
  followersSearchList: [],
  followingList: null,
  userChatsList: null,
  openChats: [],
  isLoading: false,
  error: null,
};

export const ChatContext = React.createContext<IChatContext | null>(null);

export function ChatProvider({ children }: React.PropsWithChildren) {
  const [
    {
      followersSearchList,
      followingList,
      userChatsList,
      openChats,
      isLoading,
      error,
    },
    dispatch,
  ] = useReducer(chatReducer, initialState);
  const {
    user,
    updateCurrentUser,
    isLoading: isUserLoading,
  } = useAuthContext();

  const { getList, result, loading: isSearchLoading } = useUserList();
  const { getOne, data: userData } = useUser(user?.id);
  const { getFullList, result: chatListResult } = useChatList();
  const { createOne } = useChat(user?.id);
  const { getOne: getOneChat } = useChat();

  //  LOAD USER

  useEffect(() => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  }, [user]);

  //  HANDLE FOLLOWING SEARCH

  const handleSearch = useCallback(
    (value: string) => {
      if (value.length >= 3) {
        getList({
          queryParams: { filter: `name~"${value}"` },
        });
      } else {
        dispatch({ type: 'CANCEL_SEARCH' });
      }
    },
    [getList]
  );

  useEffect(() => {
    if (result)
      dispatch({
        type: 'UPDATE_SEARCH',
        payload: result as IUser[],
      });
  }, [result]);

  // FOLLOWING LIST

  useEffect(() => {
    if (user) {
      getOne({ expand: 'followers' });
    }
  }, [user?.followers, getOne, user]);

  useEffect(() => {
    if (!userData) return;
    dispatch({
      type: 'UPDATE_FOLLOWING',
      payload: userData,
    });
  }, [userData?.followers, userData]);

  // CHAT

  const loadChats = useCallback(() => {
    if (user) {
      getFullList({
        sort: 'created',
        expand: 'users,',
        filter: `users~"${user?.id}"`,
      });
    }
  }, [user, getFullList]);

  const handleOpenChatToggle: THandleOpenChatToggleFunction = async (chat) => {
    dispatch({ type: 'UPDATE_OPEN_CHATS', payload: chat });
  };
  const handleClearOpenChats: THandleClearOpenChatsFunction = () => {
    dispatch({ type: 'CLEAR_OPEN_CHATS', payload: null });
  };
  const createChatWithUser = async (otherUser: string) => {
    const newChatUsers = [user?.id, otherUser];
    const userChatsListUsers = userChatsList?.map((chat) => chat.users);
    const chatExists = userChatsListUsers?.map((chatUsers) =>
      chatUsers?.every((usersArr, i) => usersArr === newChatUsers[i])
    );

    if (chatExists?.some((chat) => chat === true)) return;
    try {
      const result = await createOne({ users: newChatUsers } as IChat);
      const chatData = await getOneChat(
        {
          expand: 'users,',
        },
        (result as IChat)?.id
      );
      dispatch({
        type: 'UPDATE_CREATED_CHAT',
        payload: chatData as IChat,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadChats();
  }, [user?.id, loadChats]);

  useEffect(() => {
    if (chatListResult)
      dispatch({
        type: 'UPDATE_CHATS_LIST',
        payload: chatListResult as IChat[],
      });
  }, [chatListResult]);

  useEffect(() => {
    pb.collection('chats').subscribe('*', async (e) => {
      loadChats();
    });
  }, [userChatsList, loadChats]);

  // UPDATE USERS FOLLOWING LIST

  const handleAddFollowing = (id: string): void => {
    updateCurrentUser({
      followers: [...(user?.followers as string[]), id],
    });
  };
  const handleRemoveFollowing = (id: string): Promise<void> =>
    updateCurrentUser({
      followers: user?.followers.filter((follower: string) => follower !== id),
    });

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        isSearchLoading,
        isUserLoading,
        handleSearch,
        followersSearchList,
        followingList,
        userChatsList,
        createChatWithUser,
        handleOpenChatToggle,
        handleClearOpenChats,
        openChats,
        loadChats,
        handleAddFollowing,
        handleRemoveFollowing,
        error,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const data = useContext(ChatContext);

  if (!data) {
    throw Error('useChatContext should be used inside of ChatProvider');
  }

  return data;
};
