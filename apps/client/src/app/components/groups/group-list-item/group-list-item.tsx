import { Avatar, Button, Title, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface IGroupItemProps {
  id: string;
  title: string;
}

export function GroupListItem({ id, title }: IGroupItemProps) {
  const navigate = useNavigate();
  return (
    <Button
      fullWidth
      color="gray"
      variant="light"
      size="md"
      mb={5}
      leftIcon={<Avatar size="md" radius={100} />}
      onClick={() => navigate(`${id}`)}
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
