import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserSelector } from '../../services/selectors';



function ProtectedRoute({ children, ...rest }: RouteProps) {
  const { name } = useUserSelector();
  const token = localStorage.getItem('token');
  if (!name && !token) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location
              }
            }}
          />
        )}
      />
    )
  }
  return (
    <Route {...rest} render={() => children} />
  )
}

export default ProtectedRoute;
