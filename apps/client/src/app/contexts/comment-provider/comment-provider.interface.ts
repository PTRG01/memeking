import { RecordModel } from 'pocketbase';

export type TCreateCommentFuntction = (contentText: string) => void;

export interface IComment extends RecordModel {
  id: string;
  author_id: string;
  contentText: string;
  upvote_ids: string[];
}

export interface ICommentContext {
  isLoading: boolean;
  commentListResult: IComment[] | null;
  createComment: TCreateCommentFuntction;
}
