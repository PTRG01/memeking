import {
  Group,
  Paper,
  UnstyledButton,
  Flex,
  Popover,
  ActionIcon,
} from '@mantine/core';
import { Plus, X } from 'tabler-icons-react';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import ChatAddList from '../chat-add-list/chat-add-list';
import ChatWindowMenu from '../chat-window-menu/chat-window-menu';
import { useChatWindowContext } from '../../../contexts/chat-window-provider/chat-window-provider';
import EmojiTextArea from '../../emoji-text-area/emoji-text-area';
import ChatScrollArea from '../chat-scroll-area/chat-scroll-area';
import ChatMessageBar from '../chat-message-bar/chat-message-bar';

export type TAddUserFunction = (params: {
  chatId: string;
  userId: string;
}) => void;

export function ChatWindow() {
  const { handleOpenChatToggle } = useChatContext();
  const { chatId, sendMessage, isLoading } = useChatWindowContext();

  return (
    <Paper radius={10} pb={25} w={400} withBorder={true}>
      <Group position="apart" px={20} py={10} mb={30} bg={'blue'}>
        <Group>
          <ChatWindowMenu />
        </Group>
        <UnstyledButton onClick={() => handleOpenChatToggle(chatId)}>
          <X />
        </UnstyledButton>
      </Group>
      <ChatScrollArea />
      <Flex align="center" justify="space-evenly" mx={10}>
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
          recordId={chatId}
          isLoading={isLoading}
        />
      </Flex>
    </Paper>
  );
}

export default ChatWindow;
