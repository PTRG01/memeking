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

export interface IPost {
  id: string;
  avatar: string;
  title: string;
  contentText: string;
}

export interface IPostProps {
  post: IPost;
}

export function Post({ post }: IPostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
            <Menu.Item>Delete post</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Group my={15}>
        <Text>{post.contentText}</Text>
      </Group>
    </Paper>
  );
}

export default Post;
