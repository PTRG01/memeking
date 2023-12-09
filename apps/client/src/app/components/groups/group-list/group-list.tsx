import { ScrollArea, Stack } from '@mantine/core';
import GroupListItem from '../group-list-item/group-list-item';
import LoaderComponent from '../../loader/loader';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { GroupProvider } from '../../../contexts/group-provider/group-provider';

/* eslint-disable-next-line */
export interface GroupListProps {
  groupList: IGroup[] | null;
}

export function GroupList({ groupList }: GroupListProps) {
  return (
    <Stack align="stretch">
      <LoaderComponent isLoading={false}>
        <ScrollArea mih={500} type="hover">
          {groupList?.map((group) => (
            <GroupProvider key={group.id} parentId={group.id}>
              <GroupListItem id={group.id} title={group.title} />
            </GroupProvider>
          ))}
        </ScrollArea>
      </LoaderComponent>
    </Stack>
  );
}

export default GroupList;
