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

  const handleItemClick = () => {
    return '';
  };

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
        </Tabs.List>{' '}
        <Tabs.Panel value="memes" pt="xs">
          Gallery tab content
        </Tabs.Panel>
        <Tabs.Panel value="posts" pt="xs">
          Messages tab content
        </Tabs.Panel>
        <Tabs.Panel value="following" pt="xs">
          <SimpleGrid cols={3}>
            <UserList
              userList={followingList}
              onAddUser={handleAddFollowing}
              onRemoveUser={handleRemoveFollowing}
              currentList={followingList}
              isLoading={isLoading}
              itemActive={true}
              handleItemClick={handleItemClick}
              hideExisting={false}
              card={true}
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
