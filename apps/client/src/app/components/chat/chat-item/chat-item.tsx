import { Flex, Avatar, Text, Menu } from '@mantine/core';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useMemo } from 'react';

export interface IChatItemProps {
  avatar: string;
  id: string;
  expand: IUser[];
}

export function ChatItem({ avatar, id, expand }: IChatItemProps) {
  const { handleOpenChatToggle } = useChatContext();

  const chatUsers = useMemo(
    () =>
      expand
        ?.map(
          (user: IUser) =>
            user.username.charAt(0).toUpperCase() + user.username.slice(1)
        )
        .join(', '),
    [expand]
  );

  return (
    <Menu.Item onClick={() => handleOpenChatToggle(id)}>
      <Flex mb={5} align="center">
        <Avatar size="lg">{avatar}</Avatar>
        <Flex ml={15} direction="column">
          <Text fw={500}>{chatUsers}</Text>
        </Flex>
      </Flex>
    </Menu.Item>
  );
}

export default ChatItem;
