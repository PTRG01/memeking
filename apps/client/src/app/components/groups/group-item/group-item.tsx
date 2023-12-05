import { Avatar, Button, Flex, Text, Title } from '@mantine/core';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface IGroupItemProps {
  id: string;
  title: string;
  posts: IPost[];
}

export function GroupItem({ id, title }: IGroupItemProps) {
  const navigate = useNavigate();

  return (
    <Button
      variant="light"
      leftIcon={<Avatar size="md" radius={100} />}
      fullWidth
      color="gray"
      radius="md"
      size="md"
      my={5}
      style={{ display: 'flex' }}
      onClick={() => navigate(`${id}`)}
    >
      <Flex justify="flex-start" direction="column" align="flex-start">
        <Title size={14} weight={400}>
          {title}
        </Title>
        <Text size={10} weight={100}>
          Last active:
        </Text>
      </Flex>
    </Button>
  );
}

export default GroupItem;
