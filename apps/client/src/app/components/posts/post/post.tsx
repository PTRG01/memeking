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

export interface IPostProps {
  post: IPost;
}

export function Post({ post }: IPostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { deletePost } = usePostContext();
  return (
    <Paper p={15} my={10}>
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
            <Menu.Item onClick={() => ''}>Edit post</Menu.Item>
            <Menu.Item onClick={() => deletePost(post?.id)}>
              Delete post
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Group my={15}>
        <Text>{post.contentText}</Text>
      </Group>
      <VoteBar />
    </Paper>
  );
}

export default Post;
