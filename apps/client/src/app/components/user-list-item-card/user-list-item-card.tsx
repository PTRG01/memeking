import {
  Avatar,
  Flex,
  Loader,
  Text,
  UnstyledButton,
  Group,
} from '@mantine/core';
import { CircleMinus, CirclePlus } from 'tabler-icons-react';

export interface IUserListItemCardProps {
  label: string;
  avatar: string;
  id: string;
  values: string[] | undefined;
  onAddUser: (value: string) => void;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  itemActive?: boolean;
  handleItemClick: (value: string) => void;
}

function UserListItemCard({
  label,
  avatar,
  id,
  values,
  onAddUser,
  onRemoveUser,
  itemActive,
  isLoading,
  handleItemClick,
}: IUserListItemCardProps) {
  const handleValues = () => {
    if (values?.includes(id)) {
      onRemoveUser(id);
    } else {
      onAddUser(id);
    }
  };

  return (
    <div>
      <Flex align="center">
        <UnstyledButton>
          <Group>
            <Avatar size="xl" src={avatar} />
            <div>
              <Text>{label}</Text>
            </div>
          </Group>
        </UnstyledButton>
        <UnstyledButton onClick={handleValues}>
          {isLoading ? (
            <Loader size={'sm'} />
          ) : values?.includes(id) ? (
            <CircleMinus stroke="red" />
          ) : (
            <CirclePlus stroke="green" />
          )}
        </UnstyledButton>
      </Flex>
    </div>
  );
}

export default UserListItemCard;
