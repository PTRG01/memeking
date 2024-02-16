import {
  Group,
  Paper,
  UnstyledButton,
  Flex,
  Popover,
  ActionIcon,
  Avatar,
} from '@mantine/core';
import { Minus, Plus, X } from 'tabler-icons-react';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import ChatAddList from '../chat-add-list/chat-add-list';
import ChatWindowMenu from '../chat-window-menu/chat-window-menu';
import { useChatWindowContext } from '../../../contexts/chat-window-provider/chat-window-provider';
import ChatScrollArea from '../chat-scroll-area/chat-scroll-area';
import ChatMessageBar from '../chat-message-bar/chat-message-bar';
import { useMemo, useState } from 'react';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { createImageUrl } from '../../../utils/image-url';

export function ChatWindow() {
  const { user } = useAuthContext();
  const { handleOpenChatToggle } = useChatContext();
  const {
    chatId,

    currentChatUsers,
    currentChatUsersIds,
    sendMessage,
    isLoading,
    leaveChat,
    sendError,
    setSendError,
    loadingError,
    setLoadingError,
  } = useChatWindowContext();
  const [isOpened, setIsOpened] = useState(false);

  const chatAvatar = useMemo(
    () => currentChatUsers?.filter((chatUser) => chatUser.id !== user?.id)[0],
    [currentChatUsers, user]
  );
  const handleClearError = () => {
    setSendError(null);
    setLoadingError(null);
  };
  return isOpened ? (
    <Flex align="flex-end">
      <UnstyledButton onClick={() => setIsOpened(!isOpened)}>
        <Avatar
          radius={100}
          size="lg"
          src={
            chatAvatar &&
            createImageUrl('users', chatAvatar?.id, chatAvatar.avatar)
          }
        />
      </UnstyledButton>
    </Flex>
  ) : (
    <Paper radius={10} w={375} pb={10} withBorder={true}>
      <Group position="apart" px={15} py={5} bg={'blue'}>
        <Group>
          {!isLoading && (
            <ChatWindowMenu
              user={user}
              chatAvatar={chatAvatar as IUser}
              chatId={chatId}
              currentChatUsers={currentChatUsers as IUser[]}
              currentChatUsersIds={currentChatUsersIds}
              onLeaveChat={leaveChat}
            />
          )}
        </Group>
        <Group>
          <UnstyledButton onClick={() => setIsOpened(!isOpened)}>
            <Minus />
          </UnstyledButton>
          <UnstyledButton onClick={() => handleOpenChatToggle(chatId)}>
            <X />
          </UnstyledButton>
        </Group>
      </Group>
      <ChatScrollArea
        error={sendError || loadingError}
        onClearError={handleClearError}
      />
      <Flex align="center" justify="space-evenly" gap={1}>
        <Popover position="top" offset={25}>
          <Popover.Dropdown maw={300}>
            <ChatAddList />
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon radius="xl" variant="filled" size="xl" disabled>
              <Plus color="white" size={35} />
            </ActionIcon>
          </Popover.Target>
        </Popover>
        <ChatMessageBar
          onTextSubmit={sendMessage}
          chatId={chatId}
          isLoading={isLoading}
        />
      </Flex>
    </Paper>
  );
}

export default ChatWindow;
