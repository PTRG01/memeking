import PostList from '../../posts/post-list/post-list';
import { useGroupWindowContext } from '../../../contexts/group-window-provider/group-window-provider';
import { Stack } from '@mantine/core';

/* eslint-disable-next-line */
export interface IGroupContentProps {}

export function GroupContent(props: IGroupContentProps) {
  const { groupPostsListResult, isPostsLoading } = useGroupWindowContext();
  return (
    <Stack align="stretch">
      <PostList postList={groupPostsListResult} isLoading={isPostsLoading} />
    </Stack>
  );
}

export default GroupContent;
