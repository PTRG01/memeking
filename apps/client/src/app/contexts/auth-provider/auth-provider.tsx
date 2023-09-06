import React, { useEffect, useContext, useReducer } from 'react';
import { pb } from '../../utils/pocketbase';
import { useUser, useUserSubscription } from '../../hooks/pb-utils';
import {
  IAuthContext,
  IUser,
  TSignUpFunction,
  TSignInFunction,
  TLogoutFunction,
} from './auth-provider.interface';
import { createActionReducer } from '../../hooks/create-action-reducer';
/*eslint-disable*/

const initialState = {
  data: null,
  isLoading: false,
  isLoggedIn: false,
  error: '',
};

export const AuthContext = React.createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [{ data: user, isLoading, isLoggedIn, error }, dispatch] = useReducer(
    createActionReducer<IUser>(),
    initialState
  );
  console.log(user);
  const { loading, updateOne } = useUser(user?.id);
  const { data: updatedUser } = useUserSubscription(user?.id || '');

  useEffect(() => {
    dispatch({ type: 'request/success', payload: updatedUser as IUser });
  }, [updatedUser]);

  useEffect(() => {
    const unregister = pb.authStore.onChange((token, arg) => {
      dispatch({
        type: 'request/success',
        payload: pb.authStore.model as IUser,
      });
    });

    return () => {
      unregister();
    };
  }, []);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        dispatch({ type: 'loading' });
        await pb.collection('users').authRefresh();
      } catch (e) {
        console.error(e);
        dispatch({ type: 'request/failure', payload: (e as Error).message });
        // TODO create interface for Pocketbase errors
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if ((e as Error).status === 401) {
          logout();
        }
      }
    };

    refreshAuth();
  }, []);

  const signUp: TSignUpFunction = async (params) => {
    try {
      dispatch({ type: 'loading' });
      await pb.collection('users').create(params);
    } catch (e) {
      console.error(e);
      dispatch({ type: 'request/failure', payload: (e as Error).message });
    }
    dispatch({ type: 'loading/stop' });
  };

  const signIn: TSignInFunction = async ({ email, password }) => {
    try {
      dispatch({ type: 'loading' });

      await pb.collection('users').authWithPassword(email, password);
    } catch (e) {
      dispatch({ type: 'request/failure', payload: (e as Error).message });
    }
    dispatch({ type: 'loading/stop' });
  };

  const logout: TLogoutFunction = async () => {
    pb.authStore.clear();
    dispatch({ type: 'resetState' });
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        user,
        isLoggedIn,
        isLoading: loading,
        isAuthLoading: isLoading,
        updateCurrentUser: updateOne,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const data = useContext(AuthContext);

  if (!data) {
    throw Error('useAuthContext should be used inside of AuthProvider');
  }

  return data;
};
