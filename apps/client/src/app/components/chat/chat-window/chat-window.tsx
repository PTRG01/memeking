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
import { useState } from 'react';

export function ChatWindow() {
  const { handleOpenChatToggle } = useChatContext();
  const { chatId, sendMessage, isLoading } = useChatWindowContext();
  const [isOpened, setIsOpened] = useState(false);
  return isOpened ? (
    <Flex align="flex-end">
      <UnstyledButton onClick={() => setIsOpened(!isOpened)}>
        <Avatar radius={100} size="lg" />
      </UnstyledButton>
    </Flex>
  ) : (
    <Paper radius={10} w={375} pb={10} withBorder={true}>
      <Group position="apart" px={15} py={5} bg={'blue'}>
        <Group>
          <ChatWindowMenu />
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

      <ChatScrollArea />
      <Flex align="center" justify="space-evenly" gap={1}>
        <Popover position="top" offset={25}>
          <Popover.Dropdown maw={300}>
            <ChatAddList />
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon radius="xl" variant="filled" size="xl">
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
