import React, { useEffect, useContext, useReducer, useState } from 'react';
import { pb } from '../../utils/pocketbase';
import { useUser, useUserSubscription } from '../../hooks/pb-utils';
import {
  IAuthContext,
  IUser,
  TSignUpFunction,
  TSignInFunction,
  TLogoutFunction,
  TUpdateUserBackgroundFunction,
  TUpdateUserAvatarFunction,
} from './auth-provider.interface';
import { authReducer, IAuthState } from './auth-reducer';
import { notifications } from '@mantine/notifications';

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: '',
};

export const AuthContext = React.createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isAppHidden, setIsAppHidden] = useState(false);

  const [{ user, isLoading, isLoggedIn }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const { loading, updateOne, updateImage } = useUser(user?.id);
  const { data: updatedUser } = useUserSubscription(user?.id || '');

  useEffect(() => {
    dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser as IUser });
  }, [updatedUser]);

  useEffect(() => {
    const unregister = pb.authStore.onChange((token, arg) => {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: pb.authStore.model as IUser,
      });
      setIsAppHidden(false);
    });

    return () => {
      unregister();
      setIsAppHidden(true);
    };
  }, []);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        dispatch({ type: 'LOADING', payload: null });
        await pb.collection('users').authRefresh();
      } catch (e) {
        console.error(e);
        dispatch({ type: 'AUTH_FAILURE', payload: (e as Error).message });
        // TODO create interface for Pocketbase errors
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if ((e as Error).status === 401) {
          logout();
          setIsAppHidden(true);
        }
      }
    };

    refreshAuth();
  }, []);

  const signUp: TSignUpFunction = async (params) => {
    try {
      dispatch({ type: 'LOADING', payload: null });
      await pb.collection('users').create(params);
    } catch (e) {
      console.error(e);
      dispatch({ type: 'AUTH_FAILURE', payload: (e as Error).message });
    }
    dispatch({ type: 'LOADING_STOP', payload: null });
    const loginData = { email: params.email, password: params.password };
    signIn(loginData);
  };

  const signIn: TSignInFunction = async ({ email, password }) => {
    try {
      dispatch({ type: 'LOADING', payload: null });

      await pb.collection('users').authWithPassword(email, password);
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: (error as Error).message });
      notifications.show({
        title: 'Error',
        message: (error as Error).message,
        color: 'red',
        withCloseButton: true,
        onClose: () => dispatch({ type: 'CLEAR_ERROR', payload: null }),
        autoClose: 5000,
      });
    }
    dispatch({ type: 'LOADING_STOP', payload: null });
  };

  const logout: TLogoutFunction = async () => {
    pb.authStore.clear();
    dispatch({ type: 'SIGNOUT', payload: null });
    setIsAppHidden(true);
  };

  const updateUserAvatar: TUpdateUserAvatarFunction = (image) => {
    updateImage({
      avatar: image[0],
    });
  };
  const updateUserBackground: TUpdateUserBackgroundFunction = (image) => {
    updateImage({
      backgroundImage: image[0],
    });
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
        updateUserAvatar,
        updateUserBackground,
        isAppHidden,
        setIsAppHidden,
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
