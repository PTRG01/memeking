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
  Box,
} from '@mantine/core';
import { Photo, MessageCircle, Settings, Friends } from 'tabler-icons-react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import UserList from '../../components/user-list/user-list';
import UserListItemCard from '../../components/user-list-item-card/user-list-item-card';
import PostList from '../../components/posts/post-list/post-list';
import { usePostContext } from '../../contexts/post-provider/post-provider';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateData } from '../../utils/navigate';

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
  const { profileTab } = useParams();
  const navigate = useNavigate();

  const handleItemClick = () => {
    return '';
  };
  return (
    <Box mx={10} mt={10}>
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
              <Text>{userPostsList?.length}</Text>
            </Group>
            <Group>
              <Text>Following:</Text> <Text>{user?.followers.length}</Text>
            </Group>
          </Group>
        </Flex>
      </Group>
      <Tabs defaultValue="memes" value={profileTab}>
        <Tabs.List>
          <Tabs.Tab
            value="memes"
            icon={<Photo size="0.8rem" />}
            onClick={() => navigate(navigateData.profileMemes)}
          >
            Memes
          </Tabs.Tab>

          <Tabs.Tab
            value="posts"
            icon={<MessageCircle size="0.8rem" />}
            onClick={() => navigate(navigateData.profilePosts)}
          >
            Posts
          </Tabs.Tab>

          <Tabs.Tab
            value="following"
            icon={<Friends size="0.8rem" />}
            onClick={() => navigate(navigateData.profileFollowing)}
          >
            Following
          </Tabs.Tab>

          <Tabs.Tab
            value="settings"
            icon={<Settings size="0.8rem" />}
            onClick={() => navigate(navigateData.profileSettings)}
          >
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="memes" pt="xs">
          Gallery tab content
        </Tabs.Panel>
        <Tabs.Panel value="posts" pt="xs">
          <PostList postList={userPostsList} isLoading={isLoading} />
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
    </Box>
  );
}

export default Profile;
