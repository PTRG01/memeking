import { IUser } from '../contexts/auth-provider/auth-provider.interface';

export interface IActionState<T> {
  data: T | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error?: string | null;
}

export type TActionResult<T> =
  | { type: 'loading' }
  | { type: 'loading/stop' }
  | { type: 'request/success'; payload: T }
  | { type: 'request/failure'; payload: string }
  | { type: 'clearError'; payload: string }
  | { type: 'resetState' };

const Actions = {
  loading: 'loading',
  loadingStop: 'loading/stop',
  requestSuccess: 'request/success',
  requestFailure: 'request/failure',
  clearError: 'clearError',
  resetState: 'resetState',
};

export const createActionReducer =
  <T>() =>
  (state: IActionState<T>, action: TActionResult<T>): IActionState<T> => {
    switch (action.type) {
      case Actions.loading:
        return {
          ...state,
          isLoading: true,
        };
      case Actions.loadingStop:
        return {
          ...state,
          isLoading: false,
        };
      case Actions.requestFailure:
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
          error: action.payload,
        };

      case Actions.requestSuccess:
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
          data: action.payload,
        };

      case Actions.clearError:
        return {
          ...state,
          error: '',
        };
      case Actions.resetState:
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
          data: null,
        };
      default:
        throw new Error('Unknown action type');
    }
  };
