import { Group, UnstyledButton, Avatar, Title, Menu } from '@mantine/core';
import { DoorExit } from 'tabler-icons-react';
import { useChatWindowContext } from '../../../contexts/chat-window-provider/chat-window-provider';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { useCallback, useMemo } from 'react';

function ChatWindowMenu() {
  const { user } = useAuthContext();
  const { chatId, avatar, currentChatUsers, currentChatUsersIds, leaveChat } =
    useChatWindowContext();

  const chatUserNames = useMemo(
    () =>
      currentChatUsers
        ?.map((user) => user.name)
        ?.filter((chatUser: string) => chatUser !== user?.name)
        .join(', '),
    [currentChatUsers, user]
  );

  const handleLeaveChat = useCallback(() => {
    leaveChat(chatId, currentChatUsersIds);
  }, [chatId, currentChatUsersIds, leaveChat]);
  return (
    <Menu shadow="md" width={200} position="right-start" offset={25}>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Avatar src={avatar} size={45} radius="xl" />
            <Title color="white" weight={500} size={17} maw={230} truncate>
              {chatUserNames}
            </Title>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={handleLeaveChat} icon={<DoorExit />}>
          Leave chat
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ChatWindowMenu;
