import { IPost } from './post-provider.interface';

export interface IPostState {
  userPostsList: IPost[] | null;
  isLoading: boolean;
  error: string | null;
}

export type TPostActions =
  | { type: 'LOADING'; payload: null }
  | { type: 'LOADING_STOP'; payload: null }
  | { type: 'CLEAR_ERROR'; payload: null | null }
  | { type: 'UPDATE_POSTS_LIST'; payload: IPost[] };

const Actions = {
  LOADING: 'LOADING',
  LOADING_STOP: 'LOADING_STOP',
  UPDATE_POSTS_LIST: 'UPDATE_POSTS_LIST',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

export const postReducer = (
  state: IPostState,
  action: TPostActions
): IPostState => {
  switch (action.type) {
    case Actions.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.UPDATE_POSTS_LIST:
      return {
        ...state,
        isLoading: false,
        userPostsList: action.payload as IPost[],
      };

    case Actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    default:
      throw new Error('Unknown action type');
  }
};
