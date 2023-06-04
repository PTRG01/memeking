import { useDisclosure } from '@mantine/hooks';
import React, { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { useChat, useChatList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';

export type THandleChatOpenFunction = (params: {
  id: string;
  open: string;
  users: string[] | string;
  chat: string[];
}) => void;

export type THandleChatCloseFunction = (params: {
  id: string;
  close: string;
  users: string[] | string;
  chat: string[];
}) => void;

export type TLoadChatsFunction = () => void;
/* eslint-disable-next-line */
export type TCreateChatWithUserFunction = (otherUser: string) => void;

export interface IChat {
  id: string;
  users: string[];
  avatar: string;
}

export interface IChatContext {
  openChats: IChat[];
  handleChatOpen: THandleChatOpenFunction;
  handleChatClose: THandleChatCloseFunction;
  createChatWithUser: TCreateChatWithUserFunction;
  loadChats: TLoadChatsFunction;
  userChatsList: string[];
  loading: boolean;
}
export const ChatContext = React.createContext<IChatContext | null>(null);

export function ChatProvider({ children }: React.PropsWithChildren) {
  const { user } = useAuthContext();
  const [openChats, setChats] = useState<IChat[]>([]);
  const [userChatsList, setUserChatsList] = useState();
  const { getFullList, data, loading } = useChatList();
  const { createOne } = useChat(user?.id);

  const loadChats = useCallback(() => {
    if (user) {
      getFullList({
        sort: 'created',
        expand: 'users,',
        filter: `users~"${user?.id}"`,
      });
    }
  }, [user?.id]);

  useEffect(() => {
    filterUserList(data);
  }, [data]);

  const createChatWithUser = (otherUser: string) => {
    if (
      userChatsList
        ?.flatMap((record) => record.users.flatMap((user) => user.id))
        .includes(otherUser)
    )
      return;

    createOne({ users: [user.id, otherUser] });
  };
  const filterUserList = (data: string[]) => {
    const mergedObject = data?.reduce((result, currentObject) => {
      const { id, expand } = currentObject;

      result.push({
        id: id,
        users: expand.users,
      });
      return result;
    }, []);
    console.log(mergedObject);
    setUserChatsList(mergedObject);
  };

  const handleChatOpen: THandleChatOpenFunction = (params) => {
    const chatExists = openChats.some((record) => record.id === params.id);
    console.log(params);
    // if (openChats.includes(params.id))
    if (!chatExists) {
      setChats((openChats) => [...openChats, params]);
    }
  };

  const handleChatClose: THandleChatCloseFunction = (params) => {
    const chatExists = openChats.some((record) => record.id === params.id);
    if (chatExists) {
      const updatedChats = openChats.filter((chat) => chat.id !== params.id);
      setChats(updatedChats);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        handleChatOpen,
        handleChatClose,
        createChatWithUser,
        openChats,
        loadChats,
        userChatsList,
        loading,
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

// const filterUserList = (data: string[]) => {
//   const mergedObject = data?.reduce((result, currentObject) => {
//     const { id, expand } = currentObject;

//     result.push({
//       id: [id],
//       users: [
//         expand.users
//           .filter((item) => item.name !== user.name)
//           .map((user) => user.name),
//       ],
//       avatar: [
//         expand.users
//           .filter((item) => item.name !== user.name)
//           .map((user) => user.avatar),
//       ],
//     });
//     return result;
//   }, []);
//   setUserChatsList(mergedObject);
// };
