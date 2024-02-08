import { RecordModel } from 'pocketbase';

export type THandleOpenChatToggleFunction = (id: string) => void;

export type TLoadChatsFunction = () => void;

export type TCreatePostFunction = (title: string, contentText: string) => void;
export type TDeletePostFunction = (id: string) => void;
export type THandleEditPostFunction = (post: IPost) => void;
export type TUpdatePostFunction = (values: IPost, post: IPost) => void;
export type THandleUpvoteFunction = (post: IPost) => void;
export type TLoadFollowingPostsFunction = (userId: string) => void;
export interface IPost extends RecordModel {
  id: string;
  avatar: string;
  title: string;
  contentText: string;
  upvote_ids: string[];
  author_id: string;
  group_id: string;
  expand: RecordModel;
}

export interface IPostContext {
  userPostsList: IPost[] | null;
  fullPostsList: IPost[] | null;
  handleUpvote: THandleUpvoteFunction;
  createPost: TCreatePostFunction;
  updatePost: TUpdatePostFunction;
  deletePost: TDeletePostFunction;
  loadFollowingPosts: TLoadFollowingPostsFunction;
  isLoading: boolean;
  isFollowingLoading: boolean;
}
