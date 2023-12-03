import { ScrollArea, Stack } from '@mantine/core';
import GroupItem from '../group-item/group-item';
import LoaderComponent from '../../loader/loader';

/* eslint-disable-next-line */
export interface GroupListProps {}

export function GroupList(props: GroupListProps) {
  return (
    <Stack align="stretch">
      <LoaderComponent isLoading={false}>
        <ScrollArea mih={800}>
          <GroupItem>Group 1</GroupItem>
          <GroupItem>Group 2</GroupItem>
          <GroupItem>Group 3</GroupItem>
        </ScrollArea>
      </LoaderComponent>
    </Stack>
  );
}

export default GroupList;
