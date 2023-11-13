import {
  Group,
  Flex,
  Avatar,
  Title,
  Text,
  Tabs,
  TextInput,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { Photo, MessageCircle, Settings, Friends } from 'tabler-icons-react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import UserList from '../../components/user-list/user-list';
import UserListItemCard from '../../components/user-list-item-card/user-list-item-card';
import Post from '../../components/posts/post/post';
import PostList from '../../components/posts/post-list/post-list';
import PostForm from '../../components/posts/post-form/post-form';
import { usePostContext } from '../../contexts/post-provider/post-provider';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const { user } = useAuthContext();
  const {
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    isLoading,
  } = useChatContext();
  const { userPostsList } = usePostContext();
  const handleItemClick = () => {
    return '';
  };

  const tempPostList = [
    {
      id: '43254432544',
      avatar: '',
      title: 'Post 1',
      contentText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eos, quos vitae nisi doloremque ullam eligendi unde inventore dolorem voluptatibus minima dignissimos suscipit, repellendus earum voluptas  quas dolorum voluptatum commodi!',
    },
    {
      id: '124235343',
      avatar: '',
      title: 'Post 2',
      contentText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eos, quos vitae nisi doloremque ullam eligendi unde inventore dolorem voluptatibus minima dignissimos suscipit, repellendus earum voluptas  quas dolorum voluptatum commodi!',
    },
    {
      id: '53425663653',
      avatar: '',
      title: 'Post 3',
      contentText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eos, quos vitae nisi doloremque ullam eligendi unde inventore dolorem voluptatibus minima dignissimos suscipit, repellendus earum voluptas  quas dolorum voluptatum commodi!',
    },
  ];

  return (
    <Flex direction="column" mx={100} mt={20}>
      <Group position="left" mb="xl">
        <Avatar size="xl" />
        <Flex direction="column">
          <Title>{user?.name}</Title>
          <Group>
            <Group>
              <Text>Memes:</Text>
              <Text>25</Text>
            </Group>
            <Group>
              <Text>Posts:</Text>
              <Text>12</Text>
            </Group>
            <Group>
              <Text>Following:</Text> <Text>{user?.followers.length}</Text>
            </Group>
          </Group>
        </Flex>
      </Group>
      <Tabs defaultValue="memes">
        <Tabs.List>
          <Tabs.Tab value="memes" icon={<Photo size="0.8rem" />}>
            Memes
          </Tabs.Tab>
          <Tabs.Tab value="posts" icon={<MessageCircle size="0.8rem" />}>
            Posts
          </Tabs.Tab>
          <Tabs.Tab value="following" icon={<Friends size="0.8rem" />}>
            Following
          </Tabs.Tab>

          <Tabs.Tab value="settings" icon={<Settings size="0.8rem" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="memes" pt="xs">
          Gallery tab content
        </Tabs.Panel>
        <Tabs.Panel value="posts" pt="xs">
          <PostForm />
          <PostList
            listItem={(item) => <Post post={item} />}
            postList={userPostsList}
          />
        </Tabs.Panel>
        <Tabs.Panel value="following" pt="xs">
          <SimpleGrid cols={3}>
            <UserList
              listItem={(item, values) => (
                <UserListItemCard
                  user={item}
                  values={values}
                  onAddUser={handleAddFollowing}
                  onRemoveUser={handleRemoveFollowing}
                  handleItemClick={handleItemClick}
                  itemActive={false}
                  isLoading={isLoading}
                />
              )}
              userList={followingList}
              currentList={followingList}
              isLoading={isLoading}
              hideExisting={false}
            />
          </SimpleGrid>
        </Tabs.Panel>
        <Tabs.Panel value="settings" pt="xs">
          <TextInput placeholder={user?.name} label="Full name" />
          <TextInput placeholder="********" label="Password" />
          <TextInput placeholder={user?.email} label="Email" />
          <Button mt={20}>Edit</Button>
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}

export default Profile;
