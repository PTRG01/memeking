import {
  Container,
  TextInput,
  Button,
  Box,
  Textarea,
  Flex,
  Modal,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { usePostContext } from '../../../contexts/post-provider/post-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
/* eslint-disable-next-line */
type THandleCloseFormFunction = (openState: boolean) => void;
type TOnFormSubmitFuntion = (values: IPost) => void;
export interface IPostFormProps {
  post?: IPost;
  isOpen: boolean;
  onCloseForm: THandleCloseFormFunction;
  isEditing?: boolean;
  onFormSubmit: TOnFormSubmitFuntion;
}

export function PostForm({
  post,
  isEditing = false,
  isOpen,
  onCloseForm,
  onFormSubmit,
}: IPostFormProps) {
  const formValues =
    isEditing && post
      ? { title: post.title, contentText: post.contentText }
      : { title: '', contentText: '' };

  const form = useForm({
    initialValues: formValues,

    validate: {
      title: (value) =>
        value.length < 5 ? 'Title must have at least 5 letters' : null,
      contentText: (value) =>
        value.length < 20 ? 'Text must have at least 20 letters' : null,
    },
  });

  const handleFormSubmit = (values: IPost) => {
    onCloseForm(isOpen);
    onFormSubmit(values);
    form.setValues({ title: '', contentText: '' });
  };
  return (
    <Modal opened={isOpen} onClose={() => onCloseForm(isOpen)} title="Post">
      <Container>
        <Box maw={340} mx="auto">
          <form
            onSubmit={form.onSubmit((values) =>
              handleFormSubmit(values as IPost)
            )}
          >
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Your post title"
              {...form.getInputProps('title')}
            />

            <Textarea
              autosize
              withAsterisk
              label="Text"
              placeholder="Your post content"
              minRows={2}
              maxRows={10}
              {...form.getInputProps('contentText')}
            />
            <Flex justify="flex-end" mt="md" gap={10}>
              {isEditing ? (
                <Button type="submit">Confirm</Button>
              ) : (
                <Button type="submit">Create</Button>
              )}

              <Button color="gray" onClick={() => onCloseForm(isOpen)}>
                Cancel
              </Button>
            </Flex>
          </form>
        </Box>
      </Container>
    </Modal>
  );
}

export default PostForm;
