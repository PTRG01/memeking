import styles from './message-item.module.css';

/* eslint-disable-next-line */
export interface MessageItemProps {}

export function MessageItem(props: MessageItemProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MessageItem!</h1>
    </div>
  );
}

export default MessageItem;
