import { Avatar, Button, Title } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { createImageUrl } from '../../../utils/image-url';

export interface IGroupItemProps {
  id: string;
  title: string;
  onItemClick: (id: string) => void;
  avatar: FileWithPath;
}

export function GroupListItem({
  id,
  title,
  onItemClick,
  avatar,
}: IGroupItemProps) {
  return (
    <Button
      fullWidth
      color="gray"
      variant="light"
      size="lg"
      mb={5}
      leftIcon={
        <Avatar
          size="md"
          radius={5}
          src={avatar && createImageUrl('groups', id, avatar)}
        />
      }
      onClick={() => onItemClick(id)}
      styles={(theme) => ({
        root: { display: 'flex' },
      })}
    >
      <Title size={14} weight={500} truncate="end" maw={170}>
        {title}
      </Title>
    </Button>
  );
}

export default GroupListItem;
