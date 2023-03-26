import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface IPrivateRoute {
  redirectPath?: string;
  redirectUserPath?: string;
  hasToBeAuth?: boolean;
  isAuth?: boolean;
  children?: ReactElement;
}

export const PrivateRoute = ({
  redirectPath = '',
  hasToBeAuth,
  isAuth,
  children,
}: IPrivateRoute) => {
  const { isLoggedIn, isLoading } = useAuthContext();
  if (isLoading) {
    return <Navigate to={redirectPath} replace />;
  } else if (hasToBeAuth === isLoggedIn) {
    return isAuth ? (
      children ? (
        children
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to={redirectPath} replace />
    );
  }
  return <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
