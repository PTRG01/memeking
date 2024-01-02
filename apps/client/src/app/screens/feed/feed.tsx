import { ScrollArea } from '@mantine/core';
import { useFeedContext } from '../../contexts/feed-provider/feed-provider';
import Post from '../../components/posts/post/post';
import { CommentProvider } from '../../contexts/comment-provider/comment-provider';
import ContentFormBar from '../../components/content-form-bar/content-form-bar';
import { useState } from 'react';
import PostForm from '../../components/posts/post-form/post-form';
import LoaderComponent from '../../components/loader/loader';
import { IPost } from '../../contexts/post-provider/post-provider.interface';
import { usePostContext } from '../../contexts/post-provider/post-provider';

export interface IFeedProps {
  groupFeed?: boolean;
}

export function Feed({ groupFeed = false }: IFeedProps) {
  const { postsListResult, groupListResult, isLoading } = useFeedContext();
  const { createPost } = usePostContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleCreatePost = (values: IPost) => {
    createPost('', values.contentText);
  };
  return (
    <LoaderComponent isLoading={isLoading}>
      <ScrollArea>
        {!groupFeed ? <ContentFormBar onPostClick={handleToggleForm} /> : null}
        {postsListResult?.map((post) => (
          <CommentProvider key={post?.id} parentId={post?.id}>
            <Post post={post} groupsData={groupListResult} />
          </CommentProvider>
        ))}
        <PostForm
          isOpen={isOpen}
          onCloseForm={handleToggleForm}
          onFormSubmit={handleCreatePost}
        />
      </ScrollArea>
    </LoaderComponent>
  );
}

export default Feed;
