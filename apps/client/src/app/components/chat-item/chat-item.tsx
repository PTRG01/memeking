import { Flex, Avatar, Text, UnstyledButton, Menu } from '@mantine/core';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';

/* eslint-disable-next-line */
export interface IChatItemProps {
  users: string[] | string;
  lastMessage?: string;
  avatar?: string;
  id: string;
}

export function ChatItem(props: IChatItemProps) {
  const { handleChatOpen } = useChatContext();

  return (
    <Menu.Item onClick={() => handleChatOpen({ id: props.id })}>
      <Flex mb={5} align="center">
        <Avatar size="lg">{props.avatar}</Avatar>
        <Flex ml={15} direction="column">
          <Text fw={500}>{props.users.join(', ')}</Text>
        </Flex>
      </Flex>
    </Menu.Item>
  );
}

export default ChatItem;
