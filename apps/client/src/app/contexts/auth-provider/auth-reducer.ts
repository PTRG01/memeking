import { IUser } from './auth-provider.interface';

export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error?: string | null;
}

type TAuthActionsNoPayload =
  | { type: 'LOADING' }
  | { type: 'LOADING_STOP' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SIGNOUT' };

type TAuthActionsPayload =
  | { type: 'AUTH_SUCCESS'; payload: IUser }
  | { type: 'AUTH_FAILURE'; payload: string };

export type TAuthActions = TAuthActionsNoPayload | TAuthActionsPayload;

// export type TAuthActions = {
//   type:
//     | 'LOADING'
//     | 'LOADING_STOP'
//     | 'AUTH_SUCCESS'
//     | 'AUTH_FAILURE'
//     | 'CLEAR_ERROR'
//     | 'SIGNOUT';
//   payload: IUser | null;
// };

const Actions = {
  LOADING: 'LOADING',
  LOADING_STOP: 'LOADING_STOP',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SIGNOUT: 'SIGNOUT',
};

export const authReducer = (state: IAuthState, action: TAuthActions) => {
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
    case Actions.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };

    case Actions.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };

    case Actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    case Actions.SIGNOUT:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
      };
    default:
      throw new Error('Unknown action type');
  }
};
