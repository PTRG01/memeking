import {
  ActionIcon,
  Button,
  List,
  Menu,
  NavLink,
  ScrollArea,
  UnstyledButton,
  Text,
  Group,
  Container,
} from '@mantine/core';
import { Message2 } from 'tabler-icons-react';
import { useEffect, useState } from 'react';
import ChatItem from '../chat-item/chat-item';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import LoaderComponent from '../loader/loader';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { pb } from '../../utils/pocketbase';

/* eslint-disable-next-line */
export interface IChatListProps {}

export function ChatList(props: IChatListProps) {
  const [active, setActive] = useState(false);
  const { loadChats, userChatsList, loading } = useChatContext();
  const { user } = useAuthContext();

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    pb.collection('chats').subscribe('*', async (e) => {
      loadChats();
    });
  }, [userChatsList]);

  return (
    <LoaderComponent isLoading={loading}>
      <Menu
        width={250}
        zIndex={1000}
        withinPortal={true}
        onOpen={() => setActive(true)}
        onClose={() => setActive(false)}
      >
        <Menu.Target>
          <ActionIcon
            size="lg"
            radius="lg"
            color={active ? 'blue' : 'gray'}
            variant={active ? 'filled' : 'outline'}
          >
            <Message2 color="white" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Messages</Menu.Label>
          <ScrollArea>
            {userChatsList?.length === 0 ? (
              <Container p={10}>
                <Text>'No chats, start a new one.' </Text>
              </Container>
            ) : (
              userChatsList?.map((chat) => (
                <ChatItem
                  key={chat.id}
                  id={chat.id}
                  users={chat.users
                    .filter((record) => record.id !== user.id)
                    .map((user) => user.name)}
                  avatar={chat.users.map((record) => record.avatar)}
                />
              ))
            )}
          </ScrollArea>
        </Menu.Dropdown>
      </Menu>
    </LoaderComponent>
  );
}

export default ChatList;
