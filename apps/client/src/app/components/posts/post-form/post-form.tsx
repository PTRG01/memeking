import {
  Container,
  TextInput,
  Button,
  Group,
  Box,
  Checkbox,
  Textarea,
  Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { usePostContext } from '../../../contexts/post-provider/post-provider';
/* eslint-disable-next-line */
export interface PostFormProps {
  currentTitle?: string;
  currentText?: string;
}

export function PostForm({
  currentTitle = '',
  currentText = '',
}: PostFormProps) {
  const { createPost } = usePostContext();
  const form = useForm({
    initialValues: {
      title: '',
      contentText: '',
    },

    validate: {
      title: (value) =>
        value.length < 5 ? 'Name must have at least 5 letters' : null,
      contentText: (value) =>
        value.length < 20 ? 'Name must have at least 20 letters' : null,
    },
  });
  return (
    <Container>
      <Box maw={340} mx="auto">
        <form
          onSubmit={form.onSubmit((values) =>
            createPost(values.title, values.contentText)
          )}
        >
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Current title"
            {...form.getInputProps('title')}
          />

          <Textarea
            autosize
            withAsterisk
            label="Text"
            placeholder="Current text"
            {...form.getInputProps('contentText')}
          />
          <Flex justify="flex-end" mt="md" gap={10}>
            <Button type="submit">Submit</Button>
            <Button color="gray">Cancel</Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}

export default PostForm;
