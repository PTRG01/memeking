import { Avatar, Loader, Text, UnstyledButton, Group } from '@mantine/core';
import { CircleMinus, CirclePlus } from 'tabler-icons-react';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';

export interface IUserListItemInlineProps {
  label: string;
  avatar: string;
  id: string;
  values: string[] | undefined;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  handleItemClick: (value: string) => void;
  itemActive: boolean;
}

function UserListItemInline({
  label,
  avatar,
  id,
  values,
  onAddUser,
  onRemoveUser,
  isLoading,
  itemActive,
  handleItemClick,
}: IUserListItemInlineProps) {
  const handleValues = () => {
    if (values?.includes(id)) {
      onRemoveUser(id);
    } else {
      onAddUser(id);
    }
  };

  return (
    <Group spacing="md" mb={10}>
      <UnstyledButton ml={5} onClick={() => handleItemClick(id)}>
        <Group>
          <Avatar size="lg" src={avatar} />
          <Text>{label}</Text>
        </Group>
      </UnstyledButton>
      <UnstyledButton ml={90} onClick={handleValues}>
        {isLoading ? (
          <Loader size={'sm'} />
        ) : values?.includes(id) ? (
          <CircleMinus stroke="red" />
        ) : (
          <CirclePlus stroke="green" />
        )}
      </UnstyledButton>
    </Group>
  );
}

export default UserListItemInline;
