import {
  Avatar,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  UnstyledButton,
} from '@mantine/core';

/* eslint-disable-next-line */
export interface IContentFormBarProps {
  onFormClick: () => void;
}

export function ContentFormBar({ onFormClick }: IContentFormBarProps) {
  return (
    <Stack align="stretch">
      <Paper radius={15} p={20}>
        <Group noWrap mb={15}>
          <UnstyledButton>
            <Avatar radius={100} size="lg" />
          </UnstyledButton>
          <Button
            radius={50}
            variant="light"
            color="gray"
            fullWidth
            size="md"
            onClick={() => onFormClick()}
          >
            Write something...
          </Button>
        </Group>
        <Divider mb={15} />
      </Paper>
    </Stack>
  );
}

export default ContentFormBar;
