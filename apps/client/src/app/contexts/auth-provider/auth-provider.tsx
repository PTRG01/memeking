import React, { useState, useEffect, useContext, useMemo } from 'react';
import { pb } from '../../utils/pocketbase';
import { Record, Admin } from 'pocketbase';
import { useUser, useUserSubscription } from '../../hooks/pb-utils';

export type TSignInFunction = (params: {
  email: string;
  password: string;
}) => Promise<void>;

export type TSignUpFunction = (params: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  username: string;
  emailVisibility?: boolean;
}) => Promise<void>;

export type TLogoutFunction = () => void;

export interface IUser extends Record {
  email: string;
  avatar: string;
  followers: string[];
}
export type TUseUpdateUser = (params: IUser) => Promise<void>;
export type TUserModel = Record | Admin | null;

export interface IAuthContext {
  signIn: TSignInFunction;
  signUp: TSignUpFunction;
  logout: TLogoutFunction;
  user: IUser | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  isLoading: boolean;
  updateCurrentUser: (
    data: Partial<IUser>,
    overrideId?: string | undefined
  ) => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const isLoggedIn = useMemo(() => !!user, [user]);
  const [isLoading, setIsLoading] = useState(true);
  const { loading, updateOne } = useUser(user?.id);
  const { data: updatedUser } = useUserSubscription(user?.id || '');

  useEffect(() => {
    setUser(updatedUser as IUser);
  }, [updatedUser]);

  useEffect(() => {
    const unregister = pb.authStore.onChange((token, arg) => {
      setUser(pb.authStore.model as IUser);
      setIsLoading(false);
    });

    return () => {
      unregister();
    };
  }, []);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        setIsLoading(true);
        await pb.collection('users').authRefresh();
      } catch (e) {
        console.error(e);

        // TODO create interface for Pocketbase errors
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if ((e as Error).status === 401) {
          setIsLoading(false);
          logout();
        }
      }
    };

    refreshAuth();
  }, []);

  const signUp: TSignUpFunction = async (params) => {
    try {
      setIsLoading(true);

      await pb.collection('users').create(params);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const signIn: TSignInFunction = async ({ email, password }) => {
    try {
      setIsLoading(true);

      await pb.collection('users').authWithPassword(email, password);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const logout: TLogoutFunction = async () => {
    pb.authStore.clear();
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
};

export const useAuthContext = () => {
  const data = useContext(AuthContext);

  if (!data) {
    throw Error('useAuthContext should be used inside of AuthProvider');
  }

  return data;
};
