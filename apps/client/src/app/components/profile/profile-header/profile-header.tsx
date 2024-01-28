import {
  ActionIcon,
  Avatar,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Dots, FileUpload } from 'tabler-icons-react';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useState } from 'react';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import { useTranslation } from 'react-i18next';
import styles from './profile-header.module.css';
import { FileWithPath } from '@mantine/dropzone';
import { createImageUrl } from '../../../utils/image-url';

export interface ProfileHeaderProps {
  user: IUser;
  userPostsList: IPost[] | null;
  onAvatarSubmit: (images: FileWithPath[]) => void;
  onBackgroundSubmit: (images: FileWithPath[]) => void;
}

export function ProfileHeader({
  user,
  userPostsList,
  onAvatarSubmit,
  onBackgroundSubmit,
}: ProfileHeaderProps) {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const { t } = useTranslation();

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
        </Card.Section>
      </Card>
      <Group
        position="left"
        mb="xl"
        mt={-60}
        ml="sm"
        className={styles.userInfo}
      >
        <Menu>
          <Menu.Target>
            <UnstyledButton>
              <Avatar
                size="xl"
                radius={100}
                src={
                  user.avatar && createImageUrl('users', user?.id, user?.avatar)
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

      <DropzoneButton
        onSubmit={onAvatarSubmit}
        isOpen={isAvatarOpen}
        onOpen={setIsAvatarOpen}
      />

      <DropzoneButton
        onSubmit={onBackgroundSubmit}
        isOpen={isBackgroundOpen}
        onOpen={setIsBackgroundOpen}
      />
    </>
  );
}

export default ProfileHeader;
