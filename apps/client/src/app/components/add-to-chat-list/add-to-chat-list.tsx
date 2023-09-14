import { useCallback, useEffect, useState } from 'react';
import { useChat, useUserList } from '../../hooks/pb-utils';
import { UserSearch } from '../search/user-search';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import UserListItem from '../user-list-item/user-list-item';
import { Group, List, Title } from '@mantine/core';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import { pb } from '../../utils/pocketbase';

/* eslint-disable-next-line */
export type TupdateChatFunction = (params: {
  chatId: string;
  userId: string;
}) => void;

export interface IAddToChatListProps {
  id: string;
  users: string[];
}

export function AddToChatList(props: IAddToChatListProps) {
  const { user, isLoading } = useAuthContext();
  const { updateOne } = useChat(props.id);
  const { userChatsList, loadChats, searchList } = useChatContext();
  const [toAddList, setToAddList] = useState([]);
  const [isInputUsed, setInputUsed] = useState(false);

  const updateChat: TupdateChatFunction = useCallback((userId) => {
    updateOne({
      users: [...searchList.map((user) => user.id), userId],
    });
  }, []);

  const filterUsersById = (followersList, currentChatUsers) => {
    const currentUserIds = currentChatUsers.map((user) => user.id);
    const filteredFollowers = followersList.flatMap((record) =>
      record.users.filter((user) => !currentUserIds.includes(user.id))
    );
    setToAddList(filteredFollowers);
  };

  useEffect(() => {
    filterUsersById(userChatsList, props.users);
  }, []);

  useEffect(() => {
    pb.collection('chats').subscribe('*', async () => {
      loadChats();
    });
  }, [userChatsList]);

  const handleInputUsed = () => {
    setInputUsed(!isInputUsed);
  };

  return (
    <Group>
      <UserSearch
        onAddUser={() => {
          updateChat(user.id);
        }}
        onRemoveUser={function (): void {
          throw new Error('Function not implemented.');
        }}
        values={props.users?.map((user) => user.id)}
        loading={isLoading}
        hideExisting={true}
        onInputUsed={handleInputUsed}
      />
      {!isInputUsed ? (
        <Group>
          <Title size={15}>Followers:</Title>
          <List>
            {toAddList?.map((user) => (
              <UserListItem
                key={user.id}
                label={user.name}
                id={user.id}
                avatar={user.avatar}
                card={false}
                values={props.users?.map((user) => user.id)}
                onAddValue={function () {
                  updateChat(user.id);
                }}
                onRemoveValue={function () {
                  throw new Error('Function not implemented.');
                }}
                loading={false}
              />
            ))}
          </List>
        </Group>
      ) : null}
    </Group>
  );
}

export default AddToChatList;
