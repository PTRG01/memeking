import { SimpleGrid } from '@mantine/core';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import Chat from '../chat/chat';
import styles from './chats.module.css';
/* eslint-disable-next-line */
export interface IChatsProps {}

export function Chats(props: IChatsProps) {
  const { openChats } = useChatContext();
  return (
    <div className={styles['chat-container']}>
      <SimpleGrid cols={4}>
        {openChats?.map((chat) => (
          <Chat
            key={chat.id}
            id={chat.id}
            avatar={chat.avatar}
            users={chat.users}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default Chats;
