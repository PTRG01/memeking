import { Box } from '@mantine/core';
import { useParams } from 'react-router-dom';
import {
  GroupProvider,
  useGroupContext,
} from '../../contexts/group-provider/group-provider';
import GroupJoinedList from '../../components/groups/group-joined-list/group-joined-list';

/* eslint-disable-next-line */
export interface IGroupProps {}

export function Group(props: IGroupProps) {
  const { groupId } = useParams();

  if (groupId === undefined) return null;
  return (
    <GroupProvider parentId={groupId}>
      <Box>
        <GroupJoinedList />
      </Box>
    </GroupProvider>
  );
}

export default Group;
