import { Avatar, Loader, Text, UnstyledButton, Group } from '@mantine/core';
import { CircleMinus, CirclePlus } from 'tabler-icons-react';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';

export interface IUserListItemInlineProps {
  user: IUser;
  values?: string[];
  itemActive: boolean;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  handleItemClick: (value: string) => void;
}

function UserListItemInline({
  user,
  values,
  onAddUser,
  onRemoveUser,
  isLoading,
  handleItemClick,
}: IUserListItemInlineProps) {
  const handleValues = () => {
    if (values?.includes(user.id)) {
      onRemoveUser(user.id);
    } else {
      onAddUser(user.id);
    }
  };
  return (
    <Group spacing="md" mb={10}>
      <UnstyledButton ml={5} onClick={() => handleItemClick(user.id)}>
        <Group>
          <Avatar size="lg" src={user.avatar} />
          <Text>{user.name}</Text>
        </Group>
      </UnstyledButton>
      <UnstyledButton ml={90} onClick={handleValues}>
        {isLoading ? (
          <Loader size={'sm'} />
        ) : values?.includes(user.id) ? (
          <CircleMinus stroke="red" />
        ) : (
          <CirclePlus stroke="green" />
        )}
      </UnstyledButton>
    </Group>
  );
}

export default UserListItemInline;
