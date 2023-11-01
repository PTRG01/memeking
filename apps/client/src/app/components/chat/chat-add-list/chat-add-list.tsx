import { useCallback, useEffect, useState } from 'react';
import { useChat, useUserList } from '../../../hooks/pb-utils';
import { UserSearch } from '../../user-search/user-search';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import UserListItem from '../../user-list-item/user-list-item';
import { Group, List, Title } from '@mantine/core';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { pb } from '../../../utils/pocketbase';
import { useChatWindowContext } from '../../../contexts/chat-window-provider/chat-window-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import UserList from '../../user-list/user-list';

/* eslint-disable-next-line */

export interface IAddToChatListProps {
  id: string;
  users: string[];
}

export function ChatAddList() {
  const { isLoading } = useAuthContext();
  const { followingList, handleSearch } = useChatContext();
  const {
    currentChatUsers,
    updateChat,
    chatToAddList,
    handleSearchToAdd,
    isSearchUsed,
  } = useChatWindowContext();
  return (
    <Group>
      <UserSearch handleSearch={handleSearchToAdd} loading={isLoading}>
        <UserList
          key={'toAddSearchListKey'}
          userList={chatToAddList}
          onAddUser={updateChat}
          onRemoveUser={() => ''}
          currentList={currentChatUsers}
          isLoading={isLoading}
          itemActive={false}
          handleItemClick={() => ''}
          hideExisting={true}
        />
      </UserSearch>
      {!isSearchUsed ? (
        <Group>
          <Title size={15}>Followers:</Title>
          <UserList
            key={'toAddFollowingListKey'}
            userList={followingList}
            onAddUser={updateChat}
            onRemoveUser={() => ''}
            currentList={currentChatUsers}
            isLoading={isLoading}
            itemActive={false}
            handleItemClick={() => ''}
            hideExisting={true}
          />
        </Group>
      ) : null}
    </Group>
  );
}

export default ChatAddList;
