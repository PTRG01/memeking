import { Container, TextInput, Button, Box, Flex, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import EmojiTextArea from '../../emoji-text-area/emoji-text-area';
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
      ? { title: post?.title, contentText: post?.contentText }
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
    form.reset();
  };

  return (
    <Modal opened={isOpen} onClose={() => onCloseForm(isOpen)} title="Post">
      <Container>
        <Box maw={800} mx="auto">
          <form
            onSubmit={form.onSubmit((values) =>
              handleFormSubmit(values as IPost)
            )}
          >
            <TextInput
              mb={20}
              withAsterisk
              label="Title"
              placeholder="Your post title"
              {...form.getInputProps('title')}
            />
            <EmojiTextArea
              radius="sm"
              label="Content"
              onSubmit={() => ''}
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
