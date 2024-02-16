import { useRef } from 'react';
import { ScrollArea } from '@mantine/core';
import LoaderComponent from '../../loader/loader';
import { useChatWindowContext } from '../../../contexts/chat-window-provider/chat-window-provider';
import Message from '../../message/message';
import { useEffect } from 'react';
import ErrorMessage from '../../error-message/error-message';

interface IChatScrollAreaProps {
  error: Error | null;
  onClearError: () => void;
}
function ChatScrollArea({ error, onClearError }: IChatScrollAreaProps) {
  const { messages } = useChatWindowContext();
  const listRef = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'instant', block: 'end' });
    }
  }, [messages]);
  return (
    <LoaderComponent isLoading={false}>
      <ScrollArea px={20} mb={20} mt={20} h={300} viewportRef={viewport}>
        {messages?.map((message) => (
          <Message
            content={message?.content}
            key={message?.id}
            id={message?.author_id}
            timestamp={message?.created}
          />
        ))}
        {error && <ErrorMessage error={error} onClose={() => onClearError()} />}
        <div ref={listRef}></div>
      </ScrollArea>
    </LoaderComponent>
  );
}

export default ChatScrollArea;
