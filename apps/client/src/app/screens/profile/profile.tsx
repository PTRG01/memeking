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
  Stack,
  Container,
  PasswordInput,
  Card,
  ScrollArea,
  ActionIcon,
  Menu,
  UnstyledButton,
  Modal,
} from '@mantine/core';
import {
  Photo,
  MessageCircle,
  Settings,
  Friends,
  Dots,
} from 'tabler-icons-react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import UserList from '../../components/user-list/user-list';
import UserListItemCard from '../../components/user-list-item-card/user-list-item-card';
import PostList from '../../components/posts/post-list/post-list';
import { usePostContext } from '../../contexts/post-provider/post-provider';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateData } from '../../utils/navigate';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DropzoneButton } from '../../components/dropzone-button/dropzone-button';

export function Profile() {
  const { user } = useAuthContext();
  const {
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    userChatsList,
    createChatWithUser,
    handleOpenChatToggle,
    isLoading,
  } = useChatContext();
  const { userPostsList } = usePostContext();
  const { profileTab } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);

  const handleItemClick = useCallback(
    (id: string) => {
      //  Function compares chats users ids with current chat users ids, if true it opens matching chat, if not creates new chat with provided user
      const currentUsers = [user?.id, id];
      const matchingChat = userChatsList?.find(
        (chat) =>
          chat?.users?.length === currentUsers.length &&
          chat.users.every((userId) => currentUsers?.includes(userId))
      );
      if (!matchingChat) {
        createChatWithUser(id);
        return;
      }
      const chatExists = matchingChat?.users?.includes(id);
      if (chatExists) handleOpenChatToggle(matchingChat?.id);
    },
    [createChatWithUser, handleOpenChatToggle, user, userChatsList]
  );

  return (
    <Container>
      <Stack align="stretch" maw={1000}>
        <div>
          <Card>
            <Card.Section
              mih={200}
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
              }}
            >
              <Flex h="100%" justify="flex-end" align="flex-end">
                <Menu>
                  <Menu.Target>
                    <ActionIcon variant="filled">
                      <Dots />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => setIsOpened(!isOpened)}>
                      Choose image
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            </Card.Section>
          </Card>

          <Group position="left" mb="xl" mt={-15} ml="sm">
            <Menu>
              <Menu.Target>
                <UnstyledButton>
                  <Avatar size="xl" radius={100} />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => setIsOpened(!isOpened)}>
                  Choose image
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Flex direction="column">
              <Title>{user?.name}</Title>
              <Group>
                <Group>
                  <Text> {t('profile.memes')}:</Text>
                  <Text>25</Text>
                </Group>
                <Group>
                  <Text> {t('profile.posts')}:</Text>
                  <Text>{userPostsList?.length}</Text>
                </Group>
                <Group>
                  <Text> {t('profile.following')}:</Text>
                  <Text>{user?.followers.length}</Text>
                </Group>
              </Group>
            </Flex>
          </Group>
          <Modal opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
            <Stack mb={15}>
              <DropzoneButton onSubmit={() => ''} />
              <Button fullWidth type="submit">
                {t('groups.submitImage')}
              </Button>
            </Stack>
          </Modal>
        </div>
        <Tabs defaultValue="memes" value={profileTab}>
          <Tabs.List>
            <Tabs.Tab
              value="memes"
              icon={<Photo size="0.8rem" />}
              onClick={() => navigate(navigateData.profileMemes)}
            >
              {t('profile.memes')}
            </Tabs.Tab>

            <Tabs.Tab
              value="posts"
              icon={<MessageCircle size="0.8rem" />}
              onClick={() => navigate(navigateData.profilePosts)}
            >
              {t('profile.posts')}
            </Tabs.Tab>
            <Tabs.Tab
              value="following"
              icon={<Friends size="0.8rem" />}
              onClick={() => navigate(navigateData.profileFollowing)}
            >
              {t('profile.following')}
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              icon={<Settings size="0.8rem" />}
              onClick={() => navigate(navigateData.profileSettings)}
            >
              {t('profile.settings')}
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="memes" pt="xs">
            Gallery tab content
          </Tabs.Panel>
          <Tabs.Panel value="posts" pt="xs">
            <PostList postList={userPostsList} isLoading={isLoading} />
          </Tabs.Panel>
          <Tabs.Panel value="following" pt="xs">
            <ScrollArea>
              <SimpleGrid cols={3} variant="hover">
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
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="settings" pt="xs">
            <TextInput disabled placeholder={user?.name} label="Full name" />
            <PasswordInput disabled label="Password" />
            <TextInput disabled placeholder={user?.email} label="Email" />
            <Button mt={20}>Edit</Button>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default Profile;
