/* eslint-disable-next-line */

import { IPost } from '../post/post';

export interface IPostListProps {
  listItem: (item: IPost) => JSX.Element;
  postList: IPost[] | null;
}

export function PostList({ listItem, postList }: IPostListProps) {
  return postList?.map((post: IPost) => (
    <div key={post.id}>{listItem(post)}</div>
  ));
}

export default PostList;
