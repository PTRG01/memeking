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
import { ChevronDown, LineDashed, User, X } from 'tabler-icons-react';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { useTranslation } from 'react-i18next';
import { usePostContext } from '../../contexts/post-provider/post-provider';
import { createImageUrl } from '../../utils/image-url';
import { toUppercase } from '../../utils/uppercase';
import ConfirmModal from '../confirm-modal/confirm-modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateData } from '../../utils/navigate';

export interface IUserListItemCardProps {
  user: IUser;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  handleItemClick?: (value: string) => void;
  isCurrentUser: boolean;
}

function UserListItemCard({
  user,
  onRemoveUser,
  handleItemClick,
  isCurrentUser,
}: IUserListItemCardProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const { fullPostsList } = usePostContext();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const usersPosts = fullPostsList?.filter(
    (post) => post.author_id === user?.id
  );

  return (
    <Card withBorder padding="lg" radius="md">
      <Card.Section
        h={140}
        style={{
          background: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage:
            user?.backgroundImage &&
            `url(${createImageUrl('users', user?.id, user?.backgroundImage)})`,
        }}
      />
      <Avatar
        src={user?.avatar && createImageUrl('users', user?.id, user?.avatar)}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {toUppercase(user?.name)}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user?.aboutText ? user?.aboutText : <LineDashed size={10} />}
      </Text>
      <Flex mt="md" align="center" wrap="nowrap" justify="center" gap={15}>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.following')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            {user?.followers.length}
          </Text>
        </div>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.memes')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            0
          </Text>
        </div>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.posts')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            {usersPosts?.length}
          </Text>
        </div>
      </Flex>
      {isCurrentUser ? (
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
                  <User
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[5]}
                  />
                }
                onClick={() => navigate(`${navigateData.profile}/${user?.id}`)}
              >
                {t('profile.viewProfile')}
              </Menu.Item>
              <Menu.Item
                icon={
                  <X
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[5]}
                  />
                }
                onClick={() => setIsConfirmOpen(true)}
              >
                {t('profile.unfollow')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ) : (
        <Group spacing={0} mt="xl" position="center">
          <Button
            color="gray"
            onClick={() => navigate(`${navigateData.profile}/${user?.id}`)}
          >
            {t('profile.viewProfile')}
          </Button>
        </Group>
      )}
      <ConfirmModal
        title={'Confirm'}
        message="Are you sure, you want to unfollow this user?"
        onConfirm={() => onRemoveUser(user?.id)}
        onCancel={() => setIsConfirmOpen(false)}
        onClose={setIsConfirmOpen}
        open={isConfirmOpen}
      />
    </Card>
  );
}

export default UserListItemCard;
