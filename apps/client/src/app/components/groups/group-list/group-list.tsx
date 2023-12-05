import { ScrollArea, Stack } from '@mantine/core';
import GroupItem from '../group-item/group-item';
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
        <ScrollArea mih={800}>
          {groupList?.map((group) => (
            <GroupProvider key={group.id} parentId={group.id}>
              <GroupItem
                id={group.id}
                title={group.title}
                posts={group.posts}
              />
            </GroupProvider>
          ))}
        </ScrollArea>
      </LoaderComponent>
    </Stack>
  );
}

export default GroupList;
