/* eslint-disable-next-line */

import { Center, ScrollArea } from '@mantine/core';
import { CommentProvider } from '../../../contexts/comment-provider/comment-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import LoaderComponent from '../../loader/loader';
import Post from '../post/post';

export interface IPostListProps {
  postList: IPost[] | null;
  isLoading: boolean;
}
// TODO FIX LIST NOT EXTENDING TO FRAME WIDTH

export function PostList({ postList, isLoading }: IPostListProps) {
  return (
    <LoaderComponent isLoading={isLoading}>
      <Center>
        <ScrollArea h={720} type="hover" offsetScrollbars>
          {postList?.map((post: IPost) => (
            <CommentProvider key={post.id} parentId={post.id}>
              <Post post={post} />
            </CommentProvider>
          ))}
        </ScrollArea>
      </Center>
    </LoaderComponent>
  );
}

export default PostList;
