/* eslint-disable-next-line */

import {
  Button,
  Group,
  ScrollArea,
  Textarea,
  Text,
  Paper,
  UnstyledButton,
  Avatar,
  Flex,
  Popover,
  ActionIcon,
  Title,
  Menu,
  List,
} from '@mantine/core';
import { DoorExit, MoodSmile, Plus, X } from 'tabler-icons-react';
import { Send } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useChat, useMessage, useMessageList } from '../../hooks/pb-utils';
import { pb } from '../../utils/pocketbase';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import Message from '../message/message';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import LoaderComponent from '../loader/loader';
import EmojiPicker from 'emoji-picker-react';
import styles from './chat.module.css';
import UserListItem from '../user-list-item/user-list-item';
import FollowingList from '../following-list/following-list';
import AddToChatList from '../add-to-chat-list/add-to-chat-list';
import EmojiTextArea from '../emoji-text-area/emoji-text-area';

export type TAddUserFunction = (params: {
  chatId: string;
  userId: string;
}) => void;

export interface IChatProps {
  id: string;
  users?: string[];
  avatar: string;
  sendMessage: TSendMessageFunction;
  addUser: TAddUserFunction;
}

export function Chat(props: IChatProps) {
  const { loading, handleChatClose, loadChats, openChats, followersList } =
    useChatContext();
  const [messages, setMessages] = useState([]);
  const { getFullList, data } = useMessageList();
  const { updateOne } = useChat(props.id);
  const { user } = useAuthContext();

  const viewport = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(() => {
    getFullList({
      sort: 'created',
      expand: 'author_id,',
      filter: `chat_id="${props.id}"`,
    });
  }, [props.id]);

  useEffect(() => {
    loadMessages();
  }, [props.id]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  useEffect(() => {
    pb.collection('messages').subscribe('*', async (e) => {
      loadMessages(props.id);
    });
  }, [data]);

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'instant', block: 'end' });
    }
  }, [messages]);

  const leaveChat: TupdateChatFunction = useCallback((userId) => {
    updateOne({
      users: [props?.users.filter((user) => user.id === user?.id)],
    });
  }, []);

  return (
    <Paper radius={10} pb={25} w={400} withBorder={true}>
      <Group position="apart" px={20} py={10} mb={30} bg={'blue'} radius={25}>
        <Group>
          <Menu shadow="md" width={200} position="right-start" offset={25}>
            <Menu.Target>
              <UnstyledButton>
                <Group>
                  <Avatar src="" size={45} radius="xl" />
                  <Title
                    color="white"
                    weight={500}
                    size={17}
                    maw={230}
                    truncate={true}
                  >
                    {props.users
                      .flatMap((users) => users.name)
                      .filter((userName) => userName !== user.name)
                      .join(', ')}
                  </Title>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => leaveChat(user?.id)}
                icon={<DoorExit />}
              >
                Leave chat
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <UnstyledButton onClick={() => handleChatClose(props)}>
          <X />
        </UnstyledButton>
      </Group>
      <ScrollArea px={20} mb={20} mt={20} h={300} viewportRef={viewport}>
        <LoaderComponent isLoading={loading}>
          {messages?.map((message) => (
            <Message
              content={message.content}
              key={message.id}
              id={message.author_id}
              timestamp={message.created}
            />
          ))}
          <div ref={listRef}></div>
        </LoaderComponent>
      </ScrollArea>
      <Flex align="center" justify="space-evenly" mx={10}>
        <Popover position="top" offset={25}>
          <Popover.Dropdown maw={300}>
            <AddToChatList users={props.users} id={props.id} />
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon radius="xl" variant="filled" size="xl">
              <Plus color="white" size={35} />
            </ActionIcon>
          </Popover.Target>
        </Popover>
        <EmojiTextArea id={props.id} />
      </Flex>
    </Paper>
  );
}

export default Chat;
