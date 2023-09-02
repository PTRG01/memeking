import { MoodSmile, Send } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import {
  ActionIcon,
  Group,
  Popover,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import EmojiPicker from 'emoji-picker-react';
import { useRef } from 'react';
import { useMessage } from '../../hooks/pb-utils';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';

/* eslint-disable-next-line */
export type TSendMessageFunction = (params: {
  chatId: string;
  message: string;
}) => void;

export interface EmojiTextAreaProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Textarea>,
    'error' | 'onChange'
  > {
  id: string;
}

export function EmojiTextArea(props: EmojiTextAreaProps) {
  const { createOne } = useMessage();
  const { user } = useAuthContext();

  const sendMessage: TSendMessageFunction = (params) => {
    if (!params.message) return;
    createOne({
      content: `${params.message}`,
      author_id: `${user.id}`,
      chat_id: `${params.chatId}`,
    });
  };

  const form = useForm({
    initialValues: {
      chatInput: '',
    },
  });
  const textarea = useRef(null);

  const insertAtCursor = (message: string, emoji: string) => {
    const input = emoji.trim();

    if (!input) {
      return message;
    }
    textarea.value = message;
    const { selectionStart, selectionEnd } = textarea.current;

    const newMessage =
      message.slice(0, selectionStart) + input + message.slice(selectionEnd);

    return newMessage;
  };

  return (
    <>
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
            id="textarea"
            ref={textarea}
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
    </>
  );
}

export default EmojiTextArea;
