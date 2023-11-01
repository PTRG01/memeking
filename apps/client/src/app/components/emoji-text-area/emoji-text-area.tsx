import { MoodSmile, Send } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import { ActionIcon, Group, Popover, Textarea } from '@mantine/core';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useRef } from 'react';
import { useChatWindowContext } from '../../contexts/chat-window-provider/chat-window-provider';

/* eslint-disable-next-line */

export function EmojiTextArea() {
  const { chatId, sendMessage } = useChatWindowContext();

  const form = useForm({
    initialValues: {
      chatInput: '',
    },
  });
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  const insertAtCursor = (message: string, emoji: string) => {
    const input = emoji.trim();

    if (!input) {
      return message;
    }
    if (!textarea.current) return message;
    textarea.current.value = message;
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
            theme={Theme.DARK}
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
        key={chatId}
        id={chatId}
        onSubmit={form.onSubmit((message) => {
          sendMessage({
            message: message.chatInput,
            chatId: chatId,
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
            key={chatId}
            {...form.getInputProps('chatInput')}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage({
                  message: event.currentTarget.value,
                  chatId: chatId,
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
