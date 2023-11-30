import { ActionIcon, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Send } from 'tabler-icons-react';
import EmojiTextArea, {
  TOnTextSubmitFunction,
} from '../../emoji-text-area/emoji-text-area';
/* eslint-disable-next-line */
export interface IChatMessageBarProps {
  recordId: string;
  onTextSubmit: TOnTextSubmitFunction;
  isLoading: boolean;
}

export function ChatMessageBar({
  recordId,
  onTextSubmit,
  isLoading,
}: IChatMessageBarProps) {
  const form = useForm({
    initialValues: {
      chatInput: '',
    },
  });

  const handleChatInput = (values: string) => {
    onTextSubmit(values, recordId);
    form.reset();
  };
  return (
    <form
      key={recordId}
      id={recordId}
      onSubmit={form.onSubmit((values) => {
        handleChatInput(values.chatInput);
      })}
    >
      <Group position="apart">
        <EmojiTextArea
          withSendIcon={false}
          onSubmit={handleChatInput}
          radius="xl"
          {...form.getInputProps('chatInput')}
        />
        <ActionIcon
          loading={isLoading}
          size="xl"
          type="submit"
          variant="filled"
          radius="xl"
        >
          <Send />
        </ActionIcon>
      </Group>
    </form>
  );
}

export default ChatMessageBar;
