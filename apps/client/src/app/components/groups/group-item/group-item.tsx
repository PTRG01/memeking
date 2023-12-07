import PostList from '../../posts/post-list/post-list';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';

/* eslint-disable-next-line */
export interface GroupItemProps {}

export function GroupItem(props: GroupItemProps) {
  const { groupPostsListResult, isPostsLoading } = useGroupContext();
  return (
    <PostList postList={groupPostsListResult} isLoading={isPostsLoading} />
  );
}

export default GroupItem;
