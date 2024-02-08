import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Menu,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  DoorExit,
  Dots,
  Edit,
  FileUpload,
  Plus,
  TriangleInverted,
  UserCheck,
} from 'tabler-icons-react';
import GroupEditForm from '../group-edit-form/group-edit-form';
import { useCallback, useMemo, useState } from 'react';
import { useGroupWindowContext } from '../../../contexts/group-window-provider/group-window-provider';
import LoaderComponent from '../../loader/loader';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import ContentFormBar from '../../content-form-bar/content-form-bar';
import PostForm from '../../posts/post-form/post-form';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useTranslation } from 'react-i18next';
import { createImageUrl } from '../../../utils/image-url';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import ConfirmModal from '../../confirm-modal/confirm-modal';
import ErrorMessage from '../../error-message/error-message';

export interface IGroupHeaderProps {
  groupId: string;
  user: IUser;
}

export function GroupHeader({ groupId, user }: IGroupHeaderProps) {
  const {
    groupResult,
    updateGroupImage,
    updateGroupDescription,
    joinGroup,
    leaveGroup,
    createGroupPost,
    isLoading,
    postError,
    setPostError,
    groupError,
    setGroupError,
  } = useGroupWindowContext();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { t } = useTranslation();

  const handleToggleForm = useCallback(() => {
    setIsFormOpen(!isFormOpen);
  }, [isFormOpen]);

  const handleCreatePost = useCallback(
    (values: IPost) => {
      createGroupPost(values.contentText, groupId);
    },
    [createGroupPost, groupId]
  );

  const handleUpdateDescription = useCallback(
    (aboutText: string | null) => {
      if (!aboutText) return;
      updateGroupDescription(aboutText);
      setIsImageOpen(!isImageOpen);
    },
    [isImageOpen, updateGroupDescription]
  );

  const currentUserJoined = useMemo(
    () => groupResult?.users.includes(user.id),
    [groupResult, user]
  );
  const isAdmin = useMemo(
    () => groupResult?.author_id === user?.id,
    [groupResult, user]
  );

  if (!groupResult) return null;
  return (
    <LoaderComponent isLoading={isLoading}>
      <>
        <Paper radius={15} mb={10}>
          <Card mb={15}>
            <Card.Section
              mih={200}
              style={{
                background: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage:
                  groupResult?.avatar &&
                  groupId &&
                  `url(${createImageUrl(
                    'groups',
                    groupId,
                    groupResult?.avatar
                  )}`,
              }}
            >
              <Flex h="100%" justify="flex-end" align="flex-end">
                {currentUserJoined && isAdmin && (
                  <Menu>
                    <Menu.Target>
                      <ActionIcon variant="filled">
                        <Dots />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        icon={<FileUpload />}
                        onClick={() => setIsImageOpen(true)}
                      >
                        {t('profile.selectImage')}
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}
              </Flex>
            </Card.Section>
          </Card>

          <Stack mah={500} px={15}>
            <Title>{groupResult?.title}</Title>
            <Text>
              {groupResult?.users.length} {t('groups.members')}
            </Text>
            <Text>{groupResult?.aboutText}</Text>
            <Group position="right">
              {currentUserJoined ? (
                <Menu>
                  <Menu.Target>
                    <Button
                      color="gray"
                      variant="light"
                      leftIcon={<UserCheck />}
                      rightIcon={<TriangleInverted fill="white" size={10} />}
                    >
                      {t('groups.joined')}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<DoorExit size={15} />}
                      onClick={() => setIsConfirmOpen(true)}
                    >
                      {t('groups.leave')}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button
                  leftIcon={<Plus />}
                  onClick={() => joinGroup(groupResult?.users)}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {t('groups.join')}
                </Button>
              )}
              {currentUserJoined ? (
                <Menu>
                  <Menu.Target>
                    <Button>
                      <Dots />
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {isAdmin ? (
                      <Menu.Item
                        onClick={() => setIsEditOpen(!isEditOpen)}
                        icon={<Edit size={15} />}
                      >
                        {t('groups.editGroup')}
                      </Menu.Item>
                    ) : (
                      <Menu.Item> {t('groups.editingNot')}</Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              ) : null}
            </Group>

            <Divider mb={20} />
            <Modal
              opened={isEditOpen}
              onClose={() => setIsEditOpen(!isEditOpen)}
            >
              <GroupEditForm
                group={groupResult}
                onSubmitAbout={handleUpdateDescription}
                isLoading={isLoading}
              />
            </Modal>
          </Stack>
        </Paper>
        {currentUserJoined ? (
          <ContentFormBar onFormClick={handleToggleForm} />
        ) : null}
        <DropzoneButton
          onSubmit={updateGroupImage}
          isOpen={isImageOpen}
          onOpen={setIsImageOpen}
          isLoading={isLoading}
        />
        <PostForm
          isOpen={isFormOpen}
          onCloseForm={handleToggleForm}
          onFormSubmit={handleCreatePost}
        />
        <ConfirmModal
          message="Are you sure, you want to leave this group?"
          onConfirm={() => leaveGroup()}
          onCancel={() => setIsConfirmOpen(false)}
          onClose={setIsConfirmOpen}
          open={isConfirmOpen}
        />
        {postError && (
          <ErrorMessage error={postError} onClose={() => setPostError(null)} />
        )}
        {groupError && (
          <ErrorMessage
            error={groupError}
            onClose={() => setGroupError(null)}
          />
        )}
      </>
    </LoaderComponent>
  );
}

export default GroupHeader;
