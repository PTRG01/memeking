import { Record } from 'pocketbase';
import { IPost } from '../post-provider/post-provider.interface';

export type TCreateGroupFunction = (title: string, users: string[]) => void;
export type TCreateGroupPostFunction = (
  contentText: string,
  groupId: string
) => void;
export type TLeaveGroupFunction = (groupId: string, users: string[]) => void;
export type TDeleteGroupFunction = (groupId: string) => void;

export interface IGroup extends Record {
  id: string;
  users: string[];
}

export interface IGroupContext {
  groupListResult: IGroup[] | null;
  isLoading: boolean;
  createGroup: TCreateGroupFunction;
  leaveGroup: TLeaveGroupFunction;
  deleteGroup: TDeleteGroupFunction;
  groupPostsListResult: IPost[] | null;
  isPostsLoading: boolean;
  createGroupPost: TCreateGroupPostFunction;
}
