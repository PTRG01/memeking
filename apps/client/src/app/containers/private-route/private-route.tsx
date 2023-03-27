import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';

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

  if (!isLoading)
    return hasToBeAuth === isLoggedIn ? (
      children ? (
        children
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to={redirectPath} replace />
    );

  return null;
};

export default PrivateRoute;
