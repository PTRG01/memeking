/* eslint-disable-next-line */

import { Box } from '@mantine/core';
import { IPost } from '../post/post';

export interface IPostListProps {
  listItem: (item: IPost) => JSX.Element;
  postList: IPost[] | null;
}

export function PostList({ listItem, postList }: IPostListProps) {
  return postList?.map((post: IPost) => (
    <Box key={post.id}>{listItem(post)}</Box>
  ));
}

export default PostList;
