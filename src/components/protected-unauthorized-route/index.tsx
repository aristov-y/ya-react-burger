import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';

function ProtectedUnauthorizedRoute({ children, ...rest}: RouteProps) {
  const name = useSelector<StoreType, string>(store => store.auth.user.name);
  return (
    <Route {...rest} render={() => (!name ? children : <Redirect to="/" />)} />
  )
}

export default ProtectedUnauthorizedRoute;
