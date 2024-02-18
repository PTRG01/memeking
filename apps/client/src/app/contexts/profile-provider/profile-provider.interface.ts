import { IUser } from '../auth-provider/auth-provider.interface';
import { IPost } from '../post-provider/post-provider.interface';

export interface IProfileContext {
  isLoading: boolean;
  profileUser: IUser | null;
  profilePostsList: IPost[] | null;
  profileFollowingList: IUser[] | null;
}
