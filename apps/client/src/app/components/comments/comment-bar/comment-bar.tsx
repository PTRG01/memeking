import { Divider, Stack } from '@mantine/core';
import EmojiTextArea from '../../emoji-text-area/emoji-text-area';
import CommentList from '../comment-list/comment-list';
import { IComment } from '../../../contexts/comment-provider/comment-provider.interface';
import LoaderComponent from '../../loader/loader';
import { useCommentContext } from '../../../contexts/comment-provider/comment-provider';
import { useForm } from '@mantine/form';

/* eslint-disable-next-line */
export interface ICommentBarProps {
  commentsList: IComment[] | null;
  isOpen: boolean;
  isLoading: boolean;
}

export function CommentBar({
  commentsList,
  isOpen,
  isLoading,
}: ICommentBarProps) {
  const { createComment } = useCommentContext();

  const form = useForm({
    initialValues: { contentText: '' },
  });

  const handleFormSubmit = (values: IComment) => {
    createComment(values.contentText);
    form.reset();
  };

  return (
    <Stack align="stretch" my={15}>
      <Divider />
      {isOpen ? (
        <LoaderComponent isLoading={isLoading}>
          <CommentList commentsList={commentsList} />
        </LoaderComponent>
      ) : null}
      <form
        onSubmit={form.onSubmit((values) =>
          handleFormSubmit(values as IComment)
        )}
      >
        <EmojiTextArea
          withSendIcon
          radius="xl"
          onSubmit={() => handleFormSubmit}
          {...form.getInputProps('contentText')}
        />
      </form>
    </Stack>
  );
}

export default CommentBar;
