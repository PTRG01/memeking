import { Flex, Avatar, Text, Menu } from '@mantine/core';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useMemo } from 'react';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { createImageUrl } from '../../../utils/image-url';
import { toUppercaseArr } from '../../../utils/uppercase';
import { useChatWindowContext } from '../../../contexts/chat-window-provider/chat-window-provider';

export interface IChatItemProps {
  avatar: string;
  id: string;
  expand: IUser[];
}

export function ChatItem({ avatar, id, expand }: IChatItemProps) {
  const { user } = useAuthContext();
  const { handleOpenChatToggle } = useChatContext();
  const { messages } = useChatWindowContext();

  const lastMessage = useMemo(
    () => messages?.slice(-1)[0]?.content,
    [messages]
  );

  const chatUsers = useMemo(
    () => expand.filter((chatUser) => chatUser.id !== user?.id),
    [expand, user]
  );
  const chatUsernames = useMemo(
    () => chatUsers.map((user) => user.name),
    [chatUsers]
  );
  const chatAvatar = useMemo(
    () => expand.filter((chatUser) => chatUser?.id !== user?.id)[0],
    [expand, user]
  );

  return (
    <Menu.Item onClick={() => handleOpenChatToggle(id)}>
      <Flex align="center">
        <Avatar
          size="md"
          radius={100}
          src={
            chatAvatar?.avatar &&
            createImageUrl('users', chatAvatar?.id, chatAvatar?.avatar)
          }
        />
        <Flex ml={15} direction="column">
          <Text maw={150} truncate="end" fw={500}>
            {toUppercaseArr(chatUsernames)}
          </Text>
          <Text maw={150} truncate="end">
            {lastMessage}
          </Text>
        </Flex>
      </Flex>
    </Menu.Item>
  );
}

export default ChatItem;
