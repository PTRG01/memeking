import { ScrollArea, Stack } from '@mantine/core';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import GroupSearchListItem from '../group-search-list-item/group-search-list-item';
import LoaderComponent from '../../loader/loader';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export function GroupSearchList() {
  const { user } = useAuthContext();
  const { groupSearchListResult, isGroupSearchLoading, isSearching } =
    useGroupContext();
  const { groupId } = useParams();

  const notJoinedGroups = useMemo(
    () =>
      user
        ? groupSearchListResult?.filter((group) => group?.id === groupId)
        : null,
    [groupId, groupSearchListResult, user]
  );

  return (
    <LoaderComponent isLoading={isGroupSearchLoading}>
      <Stack align="stretch">
        <ScrollArea>
          {isSearching
            ? notJoinedGroups?.map((group) => (
                <GroupSearchListItem key={group.id} group={group} />
              ))
            : null}
        </ScrollArea>
      </Stack>
    </LoaderComponent>
  );
}

export default GroupSearchList;
