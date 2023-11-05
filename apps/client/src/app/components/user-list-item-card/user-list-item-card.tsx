import { Avatar, Flex, Loader, Text, UnstyledButton } from '@mantine/core';
import { CircleMinus, CirclePlus } from 'tabler-icons-react';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';

export interface IUserListItemCardProps {
  user: IUser;
  values?: string[];
  itemActive: boolean;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  handleItemClick: (value: string) => void;
}

function UserListItemCard({
  user,
  values,
  onAddUser,
  onRemoveUser,
  isLoading,
  handleItemClick,
}: IUserListItemCardProps) {
  const handleValues = () => {
    if (values?.includes(user.id)) {
      onRemoveUser(user.id);
    } else {
      onAddUser(user.id);
    }
  };

  return (
    <Flex direction="column" align="start" m={5} maw={35}>
      <Flex align="start">
        <UnstyledButton m={5}>
          <Flex gap={15}>
            <Avatar size="xl" src={user.avatar} />
          </Flex>
        </UnstyledButton>
        <UnstyledButton onClick={handleValues} m={10}>
          {isLoading ? (
            <Loader size={'sm'} />
          ) : values?.includes(user.id) ? (
            <CircleMinus stroke="red" />
          ) : (
            <CirclePlus stroke="green" />
          )}
        </UnstyledButton>
      </Flex>
      <Text align="center" miw={60}>
        {user.name}
      </Text>
    </Flex>
  );
}

export default UserListItemCard;
