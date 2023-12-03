import { Record } from 'pocketbase';
import { IUser } from '../auth-provider/auth-provider.interface';

export interface IGroup extends Record {
  id: string;
  users: IUser[];
}

export interface IGroupContext {
  groupListResult: IGroup[] | null;
  isLoading: boolean;
  isCreating: boolean;
}
