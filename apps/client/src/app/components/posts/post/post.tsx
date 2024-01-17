import {
  Avatar,
  Burger,
  Flex,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import VoteBar from '../../vote-bar/vote-bar';
import { usePostContext } from '../../../contexts/post-provider/post-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import PostForm from '../post-form/post-form';
import CommentBar from '../../comments/comment-bar/comment-bar';
import { useCommentContext } from '../../../contexts/comment-provider/comment-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';

export interface IPostProps {
  post: IPost;
  groupsData?: IGroup[] | null;
}

export function Post({ post, groupsData }: IPostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const { deletePost, updatePost, handleUpvote } = usePostContext();
  const { commentListResult, isLoading } = useCommentContext();
  const [commentsOpen, setCommentsOpen] = useState(false);

  const handleOpenPostForm = (openState: boolean) => {
    setEditFormOpen(!openState);
  };
  const handleEditPost = (values: IPost) => {
    updatePost(values, post);
  };

  const handleOpenComments = () => {
    setCommentsOpen(!commentsOpen);
  };

  const currentGroup = groupsData?.find((group) => group?.id === post.group_id);
  const authorData = post.expand.author_id as IUser;

  return (
    <Stack align="stretch" maw={900}>
      <Paper p={25} my={10} radius="lg">
        <Flex align="center" justify="space-between">
          <Group>
            <Avatar mr={20} size="lg" src={authorData?.avatar} />
            <Stack spacing={1}>
              <Title size="h4">{currentGroup?.title}</Title>
              <Title size="h4">{authorData?.name}</Title>
            </Stack>
          </Group>
          <Menu opened={menuOpen} onChange={setMenuOpen}>
            <Menu.Target>
              <Burger
                size="sm"
                opened={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => handleOpenPostForm(editFormOpen)}>
                Edit post
              </Menu.Item>
              <Menu.Item onClick={() => deletePost(post?.id)}>
                Delete post
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Group my={15}>
          <Text lineClamp={6}>{post?.contentText}</Text>
        </Group>
        <VoteBar
          onUpvote={handleUpvote}
          post={post}
          onCommentsOpen={handleOpenComments}
          commentsList={commentListResult}
        />
        <CommentBar
          commentsList={commentListResult}
          isLoading={isLoading}
          isOpen={commentsOpen}
        />
        <PostForm
          post={post}
          isOpen={editFormOpen}
          onCloseForm={handleOpenPostForm}
          isEditing={true}
          onFormSubmit={handleEditPost}
        />
      </Paper>
    </Stack>
  );
}

export default Post;
