/* eslint-disable-next-line */

import { ScrollArea, SimpleGrid, Stack } from '@mantine/core';
import { CommentProvider } from '../../../contexts/comment-provider/comment-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import LoaderComponent from '../../loader/loader';
import Post from '../post/post';

export interface IPostListProps {
  postList: IPost[] | null;
  grid?: boolean;
  cols?: number;
  isLoading: boolean;
}
// TODO FIX LIST NOT EXTENDING TO FRAME WIDTH

export function PostList({
  postList,
  grid = false,
  cols = 3,
  isLoading,
}: IPostListProps) {
  return (
    <LoaderComponent isLoading={isLoading}>
      {grid ? (
        <Stack align="stretch">
          <SimpleGrid cols={cols}>
            {postList?.map((post: IPost) => (
              <CommentProvider key={post.id} parentId={post.id}>
                <Post post={post} />
              </CommentProvider>
            ))}
          </SimpleGrid>
        </Stack>
      ) : (
        <Stack align="stretch">
          <ScrollArea mih={720} type="hover" offsetScrollbars>
            {postList?.map((post: IPost) => (
              <CommentProvider key={post.id} parentId={post.id}>
                <Post post={post} />
              </CommentProvider>
            ))}
          </ScrollArea>
        </Stack>
      )}
    </LoaderComponent>
  );
}

export default PostList;
