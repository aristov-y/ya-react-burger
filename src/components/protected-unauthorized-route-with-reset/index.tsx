import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import { UserInfo } from '../../services/auth';

function ProtectedUnauthorizedRouteWithReset({ children, ...rest }: RouteProps) {
  const { name } = useSelector<StoreType, UserInfo>(store => store.auth.user);
  const withReset = localStorage.getItem('resetPassword');

  return (
    <Route
      {...rest}
      render={() => (
        !name && withReset === 'true' ? children : (<Redirect to="/" />)
      )}
    />
  )
}

export default ProtectedUnauthorizedRouteWithReset;
