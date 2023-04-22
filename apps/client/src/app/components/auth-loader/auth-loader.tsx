import { ReactElement } from 'react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import LoaderComponent from '../loader/loader';

/* eslint-disable-next-line */

export interface IAuthLoaderProps {
  children: ReactElement;
}

export const AuthLoader = ({ children }: IAuthLoaderProps) => {
  const { isAuthLoading: isLoading } = useAuthContext();

  return <LoaderComponent isLoading={isLoading} children={children} />;
};

export default AuthLoader;
