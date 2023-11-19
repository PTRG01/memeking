import {
  Avatar,
  Burger,
  Flex,
  Group,
  Menu,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import VoteBar from '../../vote-bar/vote-bar';
import { usePostContext } from '../../../contexts/post-provider/post-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import PostForm from '../post-form/post-form';

export interface IPostProps {
  post: IPost;
}

export function Post({ post }: IPostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const { deletePost, updatePost, handleUpvote } = usePostContext();

  const handleOpenPostForm = (openState: boolean) => {
    setEditFormOpen(!openState);
  };

  const handleEditPost = (values: IPost) => {
    updatePost(values, post);
  };
  return (
    <Paper p={25} maw={800}>
      <Flex align="center" justify="space-between">
        <Group>
          <Avatar mr={20} size="lg" src={post.avatar} />
          <Title size="h3">{post.title}</Title>
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
        <Text lineClamp={6}>{post.contentText}</Text>
      </Group>
      <VoteBar onUpvote={handleUpvote} post={post} />
      <PostForm
        post={post}
        isOpen={editFormOpen}
        onCloseForm={handleOpenPostForm}
        isEditing={true}
        onFormSubmit={handleEditPost}
      />
    </Paper>
  );
}

export default Post;
