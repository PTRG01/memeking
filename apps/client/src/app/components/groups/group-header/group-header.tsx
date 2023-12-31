import {
  Button,
  Divider,
  Group,
  Image,
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
  Plus,
  TriangleInverted,
  UserCheck,
} from 'tabler-icons-react';
import GroupEditForm from '../group-edit-form/group-edit-form';
import { useCallback, useMemo, useState } from 'react';
import { useGroupWindowContext } from '../../../contexts/group-window-provider/group-window-provider';
import LoaderComponent from '../../loader/loader';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import ContentFormBar from '../../content-form-bar/content-form-bar';
import PostForm from '../../posts/post-form/post-form';

/* eslint-disable-next-line */
export interface IGroupHeaderProps {
  groupId: string;
}

export function GroupHeader({ groupId }: IGroupHeaderProps) {
  const { user } = useAuthContext();
  const {
    groupResult,
    updateGroupImage,
    updateGroupDescription,
    joinGroup,
    leaveGroup,
    createGroupPost,
    isLoading,
  } = useGroupWindowContext();
  const [isOpened, setIsOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleForm = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

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
      setIsOpened(!isOpened);
    },
    [isOpened, updateGroupDescription]
  );

  // const handleUpdateGroupImage = (groupId: string, image: FileWithPath[] | null) => {
  //   console.log(image);
  //   if (image) updateGroupImage(groupId, image);
  // };

  const currentUserJoined = useMemo(
    () => (user ? groupResult?.users.includes(user.id) : null),
    [groupResult, user]
  );
  const isAdmin = groupResult?.author_id === user?.id;

  if (!groupResult) return null;
  return (
    <LoaderComponent isLoading={isLoading}>
      <>
        <Paper radius={15} mb={10}>
          <Image
            height={200}
            radius={15}
            mb={15}
            withPlaceholder
            // src={`http://127.0.0.1:8090/api/files/groups/${groupId}/${groupResult?.avatar}`}
          />
          <Stack mah={500} px={15}>
            <Title>{groupResult?.title}</Title>
            <Text>{groupResult?.users.length} members</Text>
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
                      Joined
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<DoorExit size={15} />}
                      onClick={() => leaveGroup()}
                    >
                      Leave group
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button
                  leftIcon={<Plus />}
                  onClick={() => joinGroup(groupResult?.users)}
                >
                  Join
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
                        onClick={() => setIsOpened(!isOpened)}
                        icon={<Edit size={15} />}
                      >
                        Edit group
                      </Menu.Item>
                    ) : (
                      <Menu.Item>Editing not allowed</Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              ) : null}
            </Group>

            <Divider mb={20} />
            <Modal opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
              <GroupEditForm
                group={groupResult}
                onSubmitAbout={handleUpdateDescription}
                onSubmitImage={() => ''}
              />
            </Modal>
          </Stack>
        </Paper>
        {currentUserJoined ? (
          <ContentFormBar onPostClick={handleToggleForm} />
        ) : null}
        <PostForm
          isOpen={isOpen}
          onCloseForm={handleToggleForm}
          onFormSubmit={handleCreatePost}
        />
      </>
    </LoaderComponent>
  );
}

export default GroupHeader;
