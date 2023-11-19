/* eslint-disable-next-line */

import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import Post from '../post/post';

export interface IPostListProps {
  postList: IPost[];
}

export function PostList({ postList }: IPostListProps) {
  return postList.map((post: IPost) => <Post key={post.id} post={post} />);
}

export default PostList;
