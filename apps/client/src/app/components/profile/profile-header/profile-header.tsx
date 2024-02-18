import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  Dots,
  FileUpload,
  Plus,
  TriangleInverted,
  UserCheck,
  X,
} from 'tabler-icons-react';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useState } from 'react';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import { useTranslation } from 'react-i18next';
import styles from './profile-header.module.css';
import { FileWithPath } from '@mantine/dropzone';
import { createImageUrl } from '../../../utils/image-url';
import ConfirmModal from '../../confirm-modal/confirm-modal';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';

export interface ProfileHeaderProps {
  user: IUser;
  userPostsList: IPost[] | null;
  onAvatarSubmit?: (images: FileWithPath[]) => void;
  onBackgroundSubmit?: (images: FileWithPath[]) => void;
  isLoading: boolean;
  isCurrentUser: boolean;
}

export function ProfileHeader({
  user,
  userPostsList,
  onAvatarSubmit,
  onBackgroundSubmit,
  isLoading,
  isCurrentUser,
}: ProfileHeaderProps) {
  const { followingList, handleAddFollowing, handleRemoveFollowing } =
    useChatContext();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isFollowed =
    followingList && followingList?.map((user) => user?.id).includes(user?.id);
  return (
    <>
      <Card>
        <Card.Section
          mih={200}
          style={{
            background: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${createImageUrl(
              'users',
              user?.id,
              user?.backgroundImage
            )}`,
          }}
        >
          <div className={styles.overlay} />
          {isCurrentUser && (
            <Flex h="100%" justify="flex-end" align="flex-end">
              <Menu>
                <Menu.Target>
                  <ActionIcon variant="filled">
                    <Dots />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<FileUpload />}
                    onClick={() => setIsBackgroundOpen(!isBackgroundOpen)}
                  >
                    {t('profile.selectImage')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          )}
        </Card.Section>
      </Card>
      <Group position="apart">
        <Group
          position="left"
          mb="xl"
          mt={-60}
          ml="sm"
          className={styles.userInfo}
        >
          <Menu disabled={!isCurrentUser}>
            <Menu.Target>
              <UnstyledButton>
                <Avatar
                  size="xl"
                  radius={100}
                  src={
                    user?.avatar &&
                    createImageUrl('users', user?.id, user?.avatar)
                  }
                />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<FileUpload />}
                onClick={() => setIsAvatarOpen(!isAvatarOpen)}
              >
                {t('profile.selectImage')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Flex direction="column">
            <Title>{user?.name}</Title>
            <Group>
              <Group>
                <Text> {t('profile.memes')}:</Text>
                <Text>0</Text>
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
            <Text>{user?.aboutText}</Text>
          </Flex>
        </Group>
        {!isCurrentUser && (
          <Group position="right">
            {isFollowed ? (
              <Menu>
                <Menu.Target>
                  <Button
                    color="gray"
                    variant="light"
                    leftIcon={<UserCheck />}
                    rightIcon={<TriangleInverted fill="white" size={10} />}
                  >
                    {t('profile.following')}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => setIsConfirmOpen(true)}
                    icon={
                      <X
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[5]}
                      />
                    }
                  >
                    {t('profile.unfollow')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button
                leftIcon={<Plus />}
                loading={isLoading}
                disabled={isLoading}
                onClick={() => handleAddFollowing(user?.id)}
              >
                {t('profile.follow')}
              </Button>
            )}
          </Group>
        )}
      </Group>
      {isCurrentUser && onAvatarSubmit && onBackgroundSubmit && (
        <>
          <DropzoneButton
            onSubmit={onAvatarSubmit}
            isOpen={isAvatarOpen}
            onOpen={setIsAvatarOpen}
            isLoading={isLoading}
          />
          <DropzoneButton
            onSubmit={onBackgroundSubmit}
            isOpen={isBackgroundOpen}
            onOpen={setIsBackgroundOpen}
            isLoading={isLoading}
          />
        </>
      )}
      <ConfirmModal
        title={'Confirm'}
        message="Are you sure, you want to unfollow this user?"
        onConfirm={() => handleRemoveFollowing(user?.id)}
        onCancel={() => setIsConfirmOpen(false)}
        onClose={setIsConfirmOpen}
        open={isConfirmOpen}
      />
    </>
  );
}

export default ProfileHeader;
