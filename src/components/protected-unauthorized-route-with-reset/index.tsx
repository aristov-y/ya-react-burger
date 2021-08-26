import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserSelector } from '../../services/selectors';

function ProtectedUnauthorizedRouteWithReset({ children, ...rest }: RouteProps) {
  const { name } = useUserSelector();
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
