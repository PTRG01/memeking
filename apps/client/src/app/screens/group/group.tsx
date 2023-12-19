import { Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import GroupContent from '../../components/groups/group-content/group-content';
import GroupHeader from '../../components/groups/group-header/group-header';
import { GroupWindowProvider } from '../../contexts/group-window-provider/group-window-provider';

/* eslint-disable-next-line */
export interface IGroupProps {}

export function Group(props: IGroupProps) {
  const { groupId } = useParams();

  if (groupId === undefined) return null;
  console.log(groupId);
  return (
    <GroupWindowProvider groupId={groupId}>
      <Stack align="stretch">
        <GroupHeader groupId={groupId} />
        <GroupContent />
      </Stack>
    </GroupWindowProvider>
  );
}

export default Group;
