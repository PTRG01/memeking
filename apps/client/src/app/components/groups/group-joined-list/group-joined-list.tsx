import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import PostList from '../../posts/post-list/post-list';

/* eslint-disable-next-line */
export interface IGroupJoinedListProps {}

export function GroupJoinedList(props: IGroupJoinedListProps) {
  const { groupPostsListResult, isPostsLoading } = useGroupContext();
  return (
    <PostList
      postList={groupPostsListResult}
      grid={true}
      isLoading={isPostsLoading}
    />
  );
}

export default GroupJoinedList;
