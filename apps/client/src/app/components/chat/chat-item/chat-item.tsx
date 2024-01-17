import { Flex, Avatar, Text, Menu } from '@mantine/core';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { IChat } from '../../../contexts/chat-provider/chat-provider.interface';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';

export function ChatItem({ users, lastMessage, avatar, id, expand }: IChat) {
  const { handleOpenChatToggle } = useChatContext();

  const chatUsers = expand.users.map(
    (user: IUser) =>
      user.username.charAt(0).toUpperCase() + user.username.slice(1)
  );

  return (
    <Menu.Item onClick={() => handleOpenChatToggle(id)}>
      <Flex mb={5} align="center">
        <Avatar size="lg">{avatar}</Avatar>
        <Flex ml={15} direction="column">
          <Text fw={500}>{chatUsers?.join(', ')}</Text>
        </Flex>
      </Flex>
    </Menu.Item>
  );
}

export default ChatItem;
