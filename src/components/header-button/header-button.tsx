import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import getIcon from './getIcon';
import styles from './header-button.module.css';
import { NavLink } from 'react-router-dom';

type IconTypes = 'BURGER' | 'LIST' | 'PROFILE';

interface OwnProps {
  text: string;
  type: IconTypes
  onClick?: () => void;
  to: string;
}

type Props = OwnProps;

const HeaderButton: FunctionComponent<Props> = ({ text, type, to }) => {
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  useEffect(() => {
    setIcon(getIcon(type));
  }, [type])
  return (
    <NavLink
      to={to}
      exact
      className=""
      activeClassName={styles.ActiveLink}
    >
      <Button
        type="secondary"
        size="medium"
      >
        {icon}
        <span
          style={{verticalAlign: 'super'}}
          className={`text ml-2 text_type_main-default ${styles.ButtonText}`}
        >
          {text}
        </span>
      </Button>
    </NavLink>
  );
};

export default HeaderButton;
