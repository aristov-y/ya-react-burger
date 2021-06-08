import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import getIcon from './getIcon';
import styles from './header-button.module.css';

type IconTypes = 'BURGER' | 'LIST' | 'PROFILE';

interface OwnProps {
  text: string;
  type: IconTypes
  onClick?: () => void;
  active: boolean;
}

type Props = OwnProps;

const HeaderButton: FunctionComponent<Props> = ({ text, type, onClick, active }) => {
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  useEffect(() => {
    setIcon(getIcon(type, active));
  }, [type, active])
  const className = `text ml-2 text_type_main-default`
    + ` ${styles['button-text']} ${active ? '' : 'text_color_inactive'}`
  return (
    <Button
      type="secondary"
      size="medium"
      onClick={onClick}
    >
      {icon}
      <span
        className={className}
        style={{verticalAlign: 'super'}}
      >
        {text}
      </span>
    </Button>
  );
};

export default HeaderButton;
