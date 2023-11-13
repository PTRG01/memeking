import { IUser } from '../auth-provider/auth-provider.interface';
import { Record } from 'pocketbase';

export type THandleOpenChatToggleFunction = (id: string) => void;

export type TLoadChatsFunction = () => void;
/* eslint-disable-next-line */
export type TCreatePostFunction = (title: string, contentText: string) => void;
export type TDeletePostFunction = (id: string) => void;

export interface IPost extends Record {
  id: string;
  avatar: string;
  title: string;
  contentText: string;
}

export interface IPostContext {
  userPostsList: IPost[] | null;
  createPost: TCreatePostFunction;
  deletePost: TDeletePostFunction;
  isLoading: boolean;
  error: string | null;
}
