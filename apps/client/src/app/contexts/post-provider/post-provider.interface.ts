import { Record } from 'pocketbase';

export type THandleOpenChatToggleFunction = (id: string) => void;

export type TLoadChatsFunction = () => void;
/* eslint-disable-next-line */
export type TCreatePostFunction = (title: string, contentText: string) => void;
export type TDeletePostFunction = (id: string) => void;
export type THandleEditPostFunction = (post: IPost) => void;
export type TUpdatePostFunction = (values: IPost, post: IPost) => void;
export type THandleUpvoteFunction = (post: IPost) => void;
export interface IPost extends Record {
  id: string;
  avatar: string;
  title: string;
  contentText: string;
  upvote_ids: string[];
}

export interface IPostContext {
  userPostsList: IPost[] | null;
  handleUpvote: THandleUpvoteFunction;
  createPost: TCreatePostFunction;
  updatePost: TUpdatePostFunction;
  deletePost: TDeletePostFunction;
  isLoading: boolean;
}
