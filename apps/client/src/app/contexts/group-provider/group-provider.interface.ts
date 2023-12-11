import { Record } from 'pocketbase';
import { IPost } from '../post-provider/post-provider.interface';

export type TCreateGroupFunction = (title: string, users: string[]) => void;
export type TCreateGroupPostFunction = (
  contentText: string,
  groupId: string
) => void;
export type TSearchGroupFunction = (value: string) => void;
export type TLeaveGroupFunction = (groupId: string, users: string[]) => void;
export type TDeleteGroupFunction = (groupId: string) => void;
export type TJoinGroupFunction = (users: string[], groupId: string) => void;
export interface IGroup extends Record {
  id: string;
  avatar: string;
  title: string;
  aboutText: string;
  users: string[];
}

export interface IGroupContext {
  groupListResult: IGroup[] | null;
  groupSearchListResult: IGroup[] | null;
  isLoading: boolean;
  createGroup: TCreateGroupFunction;
  searchGroup: TSearchGroupFunction;
  joinGroup: TJoinGroupFunction;
  leaveGroup: TLeaveGroupFunction;
  deleteGroup: TDeleteGroupFunction;
  groupPostsListResult: IPost[] | null;
  isPostsLoading: boolean;
  isGroupSearchLoading: boolean;
  isSearching: boolean;
  createGroupPost: TCreateGroupPostFunction;
}
