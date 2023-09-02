import {
  Group,
  Flex,
  Avatar,
  Title,
  Text,
  Tabs,
  TextInput,
  Button,
  List,
  SimpleGrid,
} from '@mantine/core';
import { Photo, MessageCircle, Settings, Friends } from 'tabler-icons-react';
import {
  IUser,
  useAuthContext,
} from '../../contexts/auth-provider/auth-provider';
import { useEffect } from 'react';
import { useUser } from '../../hooks/pb-utils';
import UserListItem from '../../components/user-list-item/user-list-item';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const { user, updateCurrentUser } = useAuthContext();
  const { followersList } = useChatContext();

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
            {followersList?.map((item: IUser) => (
              <UserListItem
                card={true}
                label={item.name}
                avatar={item.avatar}
                id={item.id}
                key={item.id}
                values={user?.followers}
                onAddValue={function (): void {
                  throw new Error('Function not implemented.');
                }}
                onRemoveValue={function (): void {
                  updateCurrentUser({
                    followers: user?.followers.filter(
                      (follower: string) => follower !== item.id
                    ),
                  });
                }}
                loading={false}
              />
            ))}
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
