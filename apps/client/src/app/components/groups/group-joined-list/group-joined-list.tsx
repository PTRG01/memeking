import { SimpleGrid, ScrollArea } from '@mantine/core';
import {
  GroupProvider,
  useGroupContext,
} from '../../../contexts/group-provider/group-provider';
import LoaderComponent from '../../loader/loader';
import GroupCard from '../group-card/group-card';

/* eslint-disable-next-line */
export interface IGroupJoinedListProps {}

export function GroupJoinedList(props: IGroupJoinedListProps) {
  const { groupListResult, isPostsLoading } = useGroupContext();

  return (
    <LoaderComponent isLoading={isPostsLoading}>
      <ScrollArea mah={800} type="hover">
        <SimpleGrid
          px={20}
          cols={3}
          breakpoints={[
            { minWidth: 'xl', cols: 3, spacing: 'sm' },
            { minWidth: 'lg', cols: 2, spacing: 'sm' },
            { minWidth: 'md', cols: 1, spacing: 'sm' },
          ]}
        >
          {groupListResult?.map((group) => (
            <GroupProvider key={group.id} parentId={group.id}>
              <GroupCard group={group} />
            </GroupProvider>
          ))}
        </SimpleGrid>
      </ScrollArea>
    </LoaderComponent>
  );
}

export default GroupJoinedList;
