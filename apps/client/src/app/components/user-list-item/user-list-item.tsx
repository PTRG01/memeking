import {
  Flex,
  NavLink,
  Avatar,
  UnstyledButton,
  Loader,
  Group,
  Card,
  Text,
  Button,
  Button,
} from '@mantine/core';
import { CircleMinus, CirclePlus, Message } from 'tabler-icons-react';
import { useChat, useUser } from '../../hooks/pb-utils';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider-2tsx';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
/* eslint-disable-next-line */
export interface IUserListItemProps {
  label: string;
  avatar: string;
  id: string;
  values: string[];
  onAddValue: (value: string) => void;
  onRemoveValue: (value: string) => void;
  loading: boolean;
  card: boolean;
  addUser?: boolean;
  addUser?: boolean;
}

export function UserListItem({
  label,
  avatar,
  id,
  values,
  onAddValue,
  onRemoveValue,
  loading,
  card,
  addUser,
  addUser,
}: IUserListItemProps) {
  const { createChatWithUser } = useChatContext();

  const handleValues = () => {
  const { createChatWithUser } = useChatContext();

  const handleValues = () => {
    if (values.includes(id)) {
      onRemoveValue(id);
    } else {
      onAddValue(id);
    }
  };
  if (card) {
    return (
      <Flex gap="md" direction="column">
        <Flex direction="row" justify="space-between" align="center">
          <UnstyledButton>
            <Group>
              <Avatar size="xl" src={avatar} />
              <div>
                <Text>{label}</Text>
              </div>
            </Group>
          </UnstyledButton>
          <Group position="right">
            <UnstyledButton onClick={handleValues}>
            <UnstyledButton onClick={handleValues}>
              {loading ? (
                <Loader size={'sm'} />
              ) : values.includes(id) ? (
                <CircleMinus stroke="red" />
              ) : (
                <CirclePlus stroke="green" />
              )}
            </UnstyledButton>
          </Group>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex align="center" justify="space-between " mt={5}>
        <UnstyledButton
          ml={5}
          onClick={() => (addUser ? null : createChatWithUser(id))}
        >
          <Group>
            <Avatar size="lg" src={avatar} />
            <Text>{label}</Text>
          </Group>
        </UnstyledButton>

        <UnstyledButton ml={90} onClick={handleValues}>
          {loading ? (
            <Loader size={'sm'} />
          ) : values.includes(id) ? (
            <CircleMinus stroke="red" />
          ) : (
            <CirclePlus stroke="green" />
          )}
        </UnstyledButton>
      <Flex align="center" justify="space-between " mt={5}>
        <UnstyledButton
          ml={5}
          onClick={() => (addUser ? null : createChatWithUser(id))}
        >
          <Group>
            <Avatar size="lg" src={avatar} />
            <Text>{label}</Text>
          </Group>
        </UnstyledButton>

        <UnstyledButton ml={90} onClick={handleValues}>
          {loading ? (
            <Loader size={'sm'} />
          ) : values.includes(id) ? (
            <CircleMinus stroke="red" />
          ) : (
            <CirclePlus stroke="green" />
          )}
        </UnstyledButton>
      </Flex>
    );
  }
}

export default UserListItem;
