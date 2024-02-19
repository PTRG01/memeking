import { Container, ScrollArea, Stack } from '@mantine/core';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import GroupSearchListItem from '../group-search-list-item/group-search-list-item';
import LoaderComponent from '../../loader/loader';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export function GroupSearchList() {
  const { groupSearchListResult, isGroupSearchLoading, isSearching } =
    useGroupContext();
  const { groupId } = useParams();

  const notJoinedGroups = useMemo(
    () => groupSearchListResult?.filter((group) => group?.id === groupId),
    [groupId, groupSearchListResult]
  );

  return (
    <Container>
      <Stack align="stretch">
        <LoaderComponent isLoading={isGroupSearchLoading}>
          <ScrollArea>
            {isSearching &&
              notJoinedGroups?.map((group) => (
                <GroupSearchListItem key={group.id} group={group} />
              ))}
          </ScrollArea>
        </LoaderComponent>
      </Stack>
    </Container>
  );
}

export default GroupSearchList;
