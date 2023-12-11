import PostList from '../../posts/post-list/post-list';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';

/* eslint-disable-next-line */
export interface IGroupContentProps {}

export function GroupContent(props: IGroupContentProps) {
  const { groupPostsListResult, isPostsLoading } = useGroupContext();
  return (
    <PostList postList={groupPostsListResult} isLoading={isPostsLoading} />
  );
}

export default GroupContent;
