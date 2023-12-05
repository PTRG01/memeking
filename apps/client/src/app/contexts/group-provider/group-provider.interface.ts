import { Record } from 'pocketbase';
import { IUser } from '../auth-provider/auth-provider.interface';
import { IPost } from '../post-provider/post-provider.interface';

export type TCreateGroupFunction = (title: string, users: string[]) => void;

export interface IGroup extends Record {
  id: string;
  users: IUser[];
}

export interface IGroupContext {
  groupListResult: IGroup[] | null;
  isLoading: boolean;
  isCreating: boolean;
  createGroup: TCreateGroupFunction;
  groupPostsListResult: IPost[] | null;
  isPostsLoading: boolean;
}
