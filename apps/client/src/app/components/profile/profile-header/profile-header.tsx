import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { Dots, FileUpload } from 'tabler-icons-react';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useState } from 'react';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import { useTranslation } from 'react-i18next';
import styles from './profile-header.module.css';

export interface ProfileHeaderProps {
  user: IUser;
  userPostsList: IPost[] | null;
}

export function ProfileHeader({ user, userPostsList }: ProfileHeaderProps) {
  const [isOpened, setIsOpened] = useState(false);
  const { t } = useTranslation();
  const theme = useMantineTheme();
  return (
    <>
      <Card>
        <Card.Section
          mih={200}
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
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
                  onClick={() => setIsOpened(!isOpened)}
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
              <Avatar size="xl" radius={100} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<FileUpload />}
              onClick={() => setIsOpened(!isOpened)}
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
      <Modal opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
        <Stack mb={15}>
          <DropzoneButton onSubmit={() => ''} />
          <Button fullWidth type="submit">
            {t('groups.submitImage')}
          </Button>
        </Stack>
      </Modal>
    </>
  );
}

export default ProfileHeader;
