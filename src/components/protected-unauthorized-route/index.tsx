import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserSelector } from '../../services/selectors';

function ProtectedUnauthorizedRoute({ children, ...rest}: RouteProps) {
  const { name } = useUserSelector();
  return (
    <Route {...rest} render={() => (!name ? children : <Redirect to="/" />)} />
  )
}

export default ProtectedUnauthorizedRoute;
