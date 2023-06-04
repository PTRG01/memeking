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
import { MoodSmile, Plus, X } from 'tabler-icons-react';
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

export type TsendMessageFunction = (params: {
  chatId: string;
  message: string;
}) => void;

export type TaddUserFunction = (params: {
  chatId: string;
  userId: string;
}) => void;

export interface IChatProps {
  id: string;
  users: string[];
  avatar: string;
  sendMessage: TsendMessageFunction;
  addUser: TaddUserFunction;
}

export function Chat(props: IChatProps) {
  const { loading, handleChatClose } = useChatContext();
  const [messages, setMessages] = useState([]);
  const { getFullList, data } = useMessageList();
  const { createOne } = useMessage();
  const { updateOne } = useChat();
  const { user } = useAuthContext();

  const viewport = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(
    (chatId: string[]) => {
      getFullList({
        sort: 'created',
        expand: 'author_id,',
        filter: `chat_id="${chatId}"`,
      });
    },
    [props.id]
  );

  const sendMessage: TsendMessageFunction = (params) => {
    if (!params.message) return;
    createOne({
      content: `${params.message}`,
      author_id: `${user.id}`,
      chat_id: `${params.chatId}`,
    });
  };

  const addUser: TaddUserFunction = (params) => {
    updateOne({
      id: params.chatId,
      users: props.users + params.userId,
    });
  };

  useEffect(() => {
    loadMessages(props.id);
  }, [props.id]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  useEffect(() => {
    pb.collection('messages').subscribe('*', async (e) => {
      loadMessages(props.id);
    });
  }, [data]);

  const form = useForm({
    initialValues: {
      chatInput: '',
    },
  });

  const insertAtCursor = (message: string, emoji: string) => {
    const input = emoji.trim();

    if (!input) {
      return message;
    }
    const textarea = document.getElementById('textarea');
    textarea.value = message;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    console.log(textarea, startPos, endPos);

    const newMessage =
      message.slice(0, startPos) + input + message.slice(endPos);

    return newMessage;
  };

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'instant', block: 'end' });
    }
  }, [messages]);

  return (
    <Paper radius={10} pb={25} w={400} withBorder={true}>
      <Group position="apart" px={20} py={10} mb={30} bg={'blue'} radius={25}>
        <Group>
          <Avatar src="" size={45} radius="xl" />
          <Title color="white" weight={500} size={17}>
            {props.users.join(', ')}
          </Title>
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
        <Popover position="top">
          <Popover.Dropdown>
            <FollowingList />
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon radius="xl" variant="filled" size="xl">
              <Plus color="white" size={35} />
            </ActionIcon>
          </Popover.Target>
        </Popover>
        <Popover
          withArrow={true}
          arrowPosition="center"
          arrowSize={25}
          arrowRadius={5}
          withinPortal={true}
          offset={25}
        >
          <Popover.Dropdown p={0}>
            <EmojiPicker
              lazyLoadEmojis={true}
              theme="dark"
              onEmojiClick={(e) =>
                form.setFieldValue(
                  'chatInput',
                  insertAtCursor(form.values.chatInput, e.emoji)
                )
              }
            />
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon size="xl" type="submit" variant="filled" radius="xl">
              <MoodSmile size={28} />
            </ActionIcon>
          </Popover.Target>
        </Popover>
        <form
          key={props.id}
          id={props.id}
          onSubmit={form.onSubmit((message) => {
            sendMessage({
              message: message.chatInput,
              chatId: props.id,
            });
            form.setValues({ chatInput: '' });
          })}
        >
          <Group position="apart">
            <Textarea
              radius="xl"
              size="md"
              id={'textarea'}
              key={props.id}
              {...form.getInputProps('chatInput')}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  sendMessage({
                    message: event.currentTarget.value,
                    chatId: props.id,
                  });
                  form.setValues({ chatInput: '' });
                }
              }}
            />
            <ActionIcon size="xl" type="submit" variant="filled" radius="xl">
              <Send />
            </ActionIcon>
          </Group>
        </form>
      </Flex>
    </Paper>
  );
}

export default Chat;
