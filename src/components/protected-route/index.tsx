import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import { UserInfo } from '../../services/auth';



function ProtectedRoute({ children, ...rest }: RouteProps) {
  const { name } = useSelector<StoreType, UserInfo>(store => store.auth.user);
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
