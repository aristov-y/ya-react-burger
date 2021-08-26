import React, { useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutAction } from '../../services/auth';
import { useStoreDispatch } from '../../services/store';
import styles from './profile.module.css';

interface OwnProps {
  mainBlockClassName?: string
}

type Props = OwnProps;

function Profile({ children, mainBlockClassName }: React.PropsWithChildren<Props>) {
  const history = useHistory();
  const dispatch = useStoreDispatch();
  const onLogoutClick = useCallback(() => {
    dispatch(logoutAction()).then(() => {
      history.replace({
        pathname: "/login"
      });
    });
  }, [dispatch, history]);
  return (
    <div className={styles.ProfilePage}>
      <div className={styles.ProfilePage_Menu}>
        <NavLink
          exact
          to="/profile"
          className={`text ${styles.ProfilePage_MenuItem}`}
          activeClassName={styles.ProfilePage_MenuItem_Active}
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          to="/profile/orders"
          className={styles.ProfilePage_MenuItem}
          activeClassName={styles.ProfilePage_MenuItem_Active}
        >
          История заказов
        </NavLink>
        <span className={styles.ProfilePage_MenuItem} onClick={onLogoutClick}>Выход</span>
      </div>
      <div className={`${styles.ProfilePage_Main} ${mainBlockClassName || ''}`}>
        { children }
      </div>
    </div>
  )
}

export default Profile;
