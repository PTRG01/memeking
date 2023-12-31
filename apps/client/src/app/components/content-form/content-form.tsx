import { Button, Divider, Group, Modal, Paper, Title } from '@mantine/core';
import EmojiTextArea from '../emoji-text-area/emoji-text-area';

/* eslint-disable-next-line */
export interface ContentFormProps {}

export function ContentForm(props: ContentFormProps) {
  return (
    <Paper>
      <Group position="center" mb={20}>
        <Title size={20} align="center">
          Create post
        </Title>
      </Group>
      <Divider mb={5} />
      {/* TODO Check if there is missing functionality required */}
      <EmojiTextArea minRows={6} maxRows={10} radius="md" variant="unstyled" />
      <Button fullWidth color="gray" variant="light" size="md" mt={10}>
        Post
      </Button>
    </Paper>
  );
}

export default ContentForm;
