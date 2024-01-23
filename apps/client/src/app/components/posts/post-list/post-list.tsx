import { ScrollArea, Stack } from '@mantine/core';
import { CommentProvider } from '../../../contexts/comment-provider/comment-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import LoaderComponent from '../../loader/loader';
import Post from '../post/post';

export interface IPostListProps {
  postList: IPost[] | null;

  isLoading: boolean;
}

export function PostList({ postList, isLoading }: IPostListProps) {
  return (
    <Stack align="stretch">
      <LoaderComponent isLoading={isLoading}>
        <ScrollArea mih={720} type="hover">
          {postList?.map((post: IPost) => (
            <CommentProvider key={post.id} parentId={post.id}>
              <Post post={post} />
            </CommentProvider>
          ))}
        </ScrollArea>
      </LoaderComponent>
    </Stack>
  );
}

export default PostList;
