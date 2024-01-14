import styles from './user-list-item-card.module.css';
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { ChevronDown, X } from 'tabler-icons-react';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
import { useTranslation } from 'react-i18next';

export interface IUserListItemCardProps {
  user: IUser;
  values?: string[];
  itemActive: boolean;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  handleItemClick?: (value: string) => void;
}

function UserListItemCard({
  user,
  values,
  onAddUser,
  onRemoveUser,
  isLoading,
  handleItemClick,
}: IUserListItemCardProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  return (
    <Card withBorder padding="lg" radius="md">
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
      <Avatar src={user?.avatar} size={80} radius={80} mx="auto" mt={-30} />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        Fullstack engineer
      </Text>
      <Flex mt="md" align="center" wrap="nowrap" justify="center" gap={15}>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.followers')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            25
          </Text>
        </div>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.memes')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            10
          </Text>
        </div>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.posts')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            10
          </Text>
        </div>
      </Flex>

      <Group spacing={0} mt="xl" position="center">
        <Button
          variant="default"
          className={styles.button}
          color="gray"
          onClick={() => (handleItemClick ? handleItemClick(user?.id) : null)}
        >
          {t('profile.sendMessage')}
        </Button>
        <Menu
          transitionProps={{ transition: 'pop' }}
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <ActionIcon
              variant="default"
              color={'gray'}
              size={36}
              className={styles.menuControl}
            >
              <ChevronDown style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={
                <X
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[5]}
                />
              }
              onClick={() => onRemoveUser(user?.id)}
            >
              {t('profile.unfollow')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
}

export default UserListItemCard;
