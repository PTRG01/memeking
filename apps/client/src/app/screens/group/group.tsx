import { Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { GroupProvider } from '../../contexts/group-provider/group-provider';
import GroupItem from '../../components/groups/group-item/group-item';
import ContentFormBar from '../../components/content-form-bar/content-form-bar';

/* eslint-disable-next-line */
export interface IGroupProps {}

export function Group(props: IGroupProps) {
  const { groupId } = useParams();

  if (groupId === undefined) return null;

  return (
    <GroupProvider parentId={groupId}>
      <Stack align="stretch">
        <ContentFormBar onPostClick={() => ''} onPollClick={() => ''} />
        <GroupItem />
      </Stack>
    </GroupProvider>
  );
}

export default Group;
