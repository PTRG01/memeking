import React, { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  useChat,
  useChatList,
  useUser,
  useUserList,
} from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { IUser } from '../auth-provider/auth-provider.interface';
import { pb } from '../../utils/pocketbase';

export type THandleChatOpenFunction = (params: {
  id: string;
  open: string;
  users: IUser[] | string;
  chat: IChat[];
}) => void;

export type THandleChatCloseFunction = (params: {
  id: string;
  close: string;
  users: IUser[] | string;
  chat: IChat[];
}) => void;

export type TLoadChatsFunction = () => void;
/* eslint-disable-next-line */
export type TCreateChatWithUserFunction = (otherUser: IUser) => void;
export type TLeaveChatFunction = (chatId: string, users: IUser[]) => void;
export type THandleSearchFuntion = (value: string) => void;
export type TGetListFunction = (value: string) => void;
export interface IChat {
  id: string;
  users: string[];
  avatar: string;
}

export interface IChatContext {
  openChats: IChat[];
  handleSearch: THandleSearchFuntion;
  handleChatOpen: THandleChatOpenFunction;
  handleChatClose: THandleChatCloseFunction;
  createChatWithUser: TCreateChatWithUserFunction;
  leaveChat: TLeaveChatFunction;
  loadChats: TLoadChatsFunction;
  searchList: IUser[] | undefined;
  userChatsList: IChat[] | undefined;
  followersList: IUser[] | undefined;
  getList: TGetListFunction;
  loading: boolean;
}
export const ChatContext = React.createContext<IChatContext | null>(null);

export function ChatProvider({ children }: React.PropsWithChildren) {
  const { user } = useAuthContext();
  const { getList, result } = useUserList();
  const { getOne, data: userData } = useUser(user?.id);
  const [searchList, setSearchList] = useState<IUser[]>();
  const [openChats, setOpenChats] = useState<IChat[]>([]);
  const [userChatsList, setUserChatsList] = useState<IChat[]>();
  const [followersList, setFollowersList] = useState<IUser[]>();
  const { getFullList, data: chatListData, loading } = useChatList();
  const { createOne, updateOne } = useChat(user?.id);

  const handleSearch = useCallback((value: string) => {
    if (value.length >= 3) {
      getList({
        queryParams: { filter: `name~"${value}"` },
      });
    }
  }, []);

  useEffect(() => {
    setSearchList(result);
  }, [result]);

  const loadChats = useCallback(() => {
    if (user) {
      console.log(user);
      getFullList({
        sort: 'created',
        expand: 'users',
        filter: `users~"${user?.id}"`,
      });
    }
  }, [user?.id]);

  useEffect(() => {
    filterUserList(chatListData);
  }, [chatListData]);
  console.log(user);
  useEffect(() => {
    if (user) {
      getOne({ expand: 'followers' });
    }
  }, [user?.id]);

  useEffect(() => {
    if (!userData) return;
    setFollowersList(userData.expand.followers?.map((user: IUser) => user));
  }, [userData?.followers]);

  const createChatWithUser = (otherUser: IUser) => {
    if (
      userChatsList
        ?.flatMap((record) => record.users.flatMap((user: IUser) => user.id))
        .includes(otherUser)
    )
      return;

    createOne({ users: [user.id, otherUser] });
  };

  const leaveChat = (chatId: string, users: IUser[]) => {
    updateOne({
      chatId,
      users: [
        users
          .filter((chatUser) => chatUser.id === user.id)
          .map((chatUser) => chatUser.id),
      ],
    });
  };
  const filterUserList = (data: IUser[]) => {
    const mergedObject = data?.reduce((result, currentObject) => {
      const { id, expand } = currentObject;

      result.push({
        id: id,
        users: expand.users,
      });
      return result;
    }, []);

    setUserChatsList(mergedObject);
  };

  const handleChatOpen: THandleChatOpenFunction = (params) => {
    const chatExists = openChats.some((record) => record.id === params.id);

    if (!chatExists) {
      setOpenChats((openChats: IChat[]) => [
        ...openChats,
        ...userChatsList?.filter((chat: IChat[]) => chat.id === params.id),
      ]);
    }
  };

  const handleChatClose: THandleChatCloseFunction = (params) => {
    const chatExists = openChats.some((record) => record.id === params.id);
    if (chatExists) {
      const updatedChats = openChats.filter((chat) => chat.id !== params.id);
      setOpenChats(updatedChats);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        handleSearch,
        handleChatOpen,
        handleChatClose,
        createChatWithUser,
        leaveChat,
        openChats,
        loadChats,
        searchList,
        userChatsList,
        getList,
        loading,
        followersList,
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
