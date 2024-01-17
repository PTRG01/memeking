import { IComment } from '../../../contexts/comment-provider/comment-provider.interface';
import { Box, Divider, ScrollArea } from '@mantine/core';
import CommentItem from '../comment-item/comment-item';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';

/* eslint-disable-next-line */
export interface ICommentListProps {
  commentsList: IComment[] | null;
}

export function CommentList({ commentsList }: ICommentListProps) {
  const listHeight = !commentsList ? 0 : commentsList?.length > 2 ? 300 : 150;

  //  TODO ADD AUTO SCROLL AFTER ADDING A COMMENT ?
  return (
    <Box>
      <ScrollArea.Autosize h={listHeight} type="hover">
        {commentsList?.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment?.expand?.author_id as IUser}
          >
            {comment.contentText}
          </CommentItem>
        ))}
      </ScrollArea.Autosize>
      <Divider />
    </Box>
  );
}

export default CommentList;
