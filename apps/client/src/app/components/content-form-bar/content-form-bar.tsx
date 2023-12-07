import {
  Avatar,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { Graph, LayoutCollage } from 'tabler-icons-react';

/* eslint-disable-next-line */
export interface IContentFormBarProps {
  onPostClick: () => void;
  onPollClick: () => void;
}

export function ContentFormBar({
  onPostClick,
  onPollClick,
}: IContentFormBarProps) {
  return (
    <Stack align="stretch">
      <Paper radius={15} p={20}>
        <Group noWrap mb={10}>
          <UnstyledButton>
            <Avatar radius={100} size="lg" />
          </UnstyledButton>
          <Button radius={50} variant="light" color="gray" fullWidth size="md">
            Write something...
          </Button>
        </Group>
        <Divider mb={15} />
        <Group position="apart" noWrap>
          <Button
            leftIcon={<LayoutCollage />}
            fullWidth
            size="lg"
            color="gray"
            radius={5}
            variant="subtle"
            onClick={() => onPostClick}
          >
            Image
          </Button>
          <Button
            leftIcon={<Graph />}
            fullWidth
            size="lg"
            color="gray"
            radius={5}
            variant="subtle"
            onClick={() => onPollClick}
          >
            Poll
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
}

export default ContentFormBar;
