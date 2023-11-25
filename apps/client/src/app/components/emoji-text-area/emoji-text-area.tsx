import { MoodSmile } from 'tabler-icons-react';
import { ActionIcon, Popover, Textarea } from '@mantine/core';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

/* eslint-disable-next-line */

export type TOnTextSubmitFunction = (message: string, recordId: string) => void;

export interface IEmojiTextAreaProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSubmit: (value: string) => void;
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
}

export function EmojiTextArea({
  value,
  onChange,
  radius,
  onSubmit,
  label,
}: IEmojiTextAreaProps) {
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  const insertAtCursor = (emoji: string) => {
    const input = emoji.trim();
    const message = value;

    if (!input) {
      return message;
    }
    if (!textarea.current) return message;
    textarea.current.value = message;
    const { selectionStart, selectionEnd } = textarea.current;

    const newMessage =
      message.slice(0, selectionStart) + input + message.slice(selectionEnd);
    if (newMessage) onChange(newMessage);
  };

  const handleChatInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.type === 'click') return;
    else onChange(event.currentTarget.value);
  };

  return (
    <Textarea
      radius={radius}
      size="md"
      id="textarea"
      autosize
      minRows={2}
      maxRows={5}
      ref={textarea}
      value={value}
      label={label}
      onChange={(event) => handleChatInput(event)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSubmit(event.currentTarget.value);
        }
      }}
      rightSectionWidth={60}
      rightSection={
        <Popover
          withArrow={true}
          arrowPosition="center"
          arrowSize={25}
          arrowRadius={5}
          withinPortal={true}
          offset={25}
          keepMounted={true}
        >
          {/* TODO FIX EMOJI EVENT TYPE */}
          <Popover.Dropdown p={0}>
            <Picker
              data={data}
              onEmojiSelect={(event) => insertAtCursor(event.native)}
              locale="en"
              theme="dark"
            />
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon size="xl" variant="filled" radius="xl">
              <MoodSmile size={28} />
            </ActionIcon>
          </Popover.Target>
        </Popover>
      }
    />
  );
}

export default EmojiTextArea;
