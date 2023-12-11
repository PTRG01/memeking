import { Avatar, Button, Title } from '@mantine/core';

/* eslint-disable-next-line */
export interface IGroupItemProps {
  id: string;
  title: string;
  onItemClick: (id: string) => void;
}

export function GroupListItem({ id, title, onItemClick }: IGroupItemProps) {
  return (
    <Button
      fullWidth
      color="gray"
      variant="light"
      size="md"
      mb={5}
      leftIcon={<Avatar size="md" radius={100} />}
      onClick={() => onItemClick(id)}
      styles={(theme) => ({
        root: { display: 'flex' },
      })}
    >
      <Title size={14} weight={500}>
        {title}
      </Title>
    </Button>
  );
}

export default GroupListItem;
