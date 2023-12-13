import { Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import {
  GroupProvider,
  useGroupContext,
} from '../../contexts/group-provider/group-provider';
import GroupContent from '../../components/groups/group-feed/group-content';
import ContentFormBar from '../../components/content-form-bar/content-form-bar';
import { useState } from 'react';
import PostForm from '../../components/posts/post-form/post-form';
import { IPost } from '../../contexts/post-provider/post-provider.interface';
import GroupHeader from '../../components/groups/group-header/group-header';

/* eslint-disable-next-line */
export interface IGroupProps {}

export function Group(props: IGroupProps) {
  const { groupId } = useParams();
  const { createGroupPost } = useGroupContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleForm = () => {
    setIsOpen(!isOpen);
  };

  if (groupId === undefined) return null;

  const handleCreatePost = (values: IPost) => {
    createGroupPost(values.contentText, groupId);
  };

  return (
    <GroupProvider parentId={groupId}>
      <Stack align="stretch">
        <GroupHeader />
        <ContentFormBar onPostClick={handleToggleForm} />
        <GroupContent />
        <PostForm
          isOpen={isOpen}
          onCloseForm={handleToggleForm}
          onFormSubmit={handleCreatePost}
        />
      </Stack>
    </GroupProvider>
  );
}

export default Group;
