import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '@mantine/core';

/* eslint-disable-next-line */
export interface IPrivateRoute extends React.PropsWithChildren {
  redirectPath?: string;
  redirectUserPath?: string;
  hasToBeAuth?: boolean;
}

export const PrivateRoute = ({
  redirectPath = '',
  hasToBeAuth,
  children,
}: IPrivateRoute) => {
  const { isLoggedIn, isAuthLoading: isLoading } = useAuthContext();

  if (isLoading) {
    return <Loader />;
  }
  if (hasToBeAuth === isLoggedIn) return children ? <>children</> : <Outlet />;
  else return <Navigate to={redirectPath} />;
};

export default PrivateRoute;
