import React, { useState, useEffect, useContext, useMemo } from 'react';

import { pb } from '../../utils/pocketbase';
import { Record, Admin } from 'pocketbase';

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

export interface IUser {
  email: string;
  avatar: string;
  id: string;
  load: string;
}

export type TUserModel = Record | Admin | null;

export interface IAuthContext {
  signIn: TSignInFunction;
  signUp: TSignUpFunction;
  logout: TLogoutFunction;
  user: TUserModel;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<TUserModel>(null);
  const isLoggedIn = useMemo(() => !!user, [user]);
  let isLoading = false;

  useEffect(() => {
    const unregister = pb.authStore.onChange((token) => {
      setUser(pb.authStore.model);
      console.log(pb.authStore);
    });

    return () => {
      unregister();
    };
  }, []);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        isLoading = true;
        await pb.collection('users').authRefresh();
      } catch (e) {
        console.error(e);
        isLoading = false;
      }
      isLoading = false;
    };

    return () => {
      refreshAuth();
    };
  }, []);

  const signUp: TSignUpFunction = async (params) => {
    try {
      isLoading = true;
      await pb.collection('users').create(params);
    } catch (e) {
      console.error(e);
      isLoading = false;
    }
    isLoading = false;
  };

  const signIn: TSignInFunction = async ({ email, password }) => {
    try {
      isLoading = true;
      await pb.collection('users').authWithPassword(email, password);
    } catch (e) {
      console.error(e);
      isLoading = false;
    }
    isLoading = false;
  };

  const logout: TLogoutFunction = async () => {
    pb.authStore.clear();
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, logout, user, isLoggedIn, isLoading }}
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
