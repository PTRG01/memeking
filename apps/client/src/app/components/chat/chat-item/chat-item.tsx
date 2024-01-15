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
            user.name.charAt(0).toUpperCase() + user.name.slice(1)
        )
        .join(', '),
    [expand]
  );

  return (
    <Menu.Item onClick={() => handleOpenChatToggle(id)}>
      <Flex align="center">
        <Avatar size="md" radius={100}>
          {avatar}
        </Avatar>
        <Flex ml={15} direction="column">
          <Text fw={500}>{chatUsers}</Text>
        </Flex>
      </Flex>
    </Menu.Item>
  );
}

export default ChatItem;
