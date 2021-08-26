import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

function getIcon(iconType: 'BURGER' | 'LIST' | 'PROFILE', active: boolean = false) {
  const type = active ? 'primary' : 'secondary';
  switch (iconType) {
    case 'BURGER':
      return (<BurgerIcon type={type} />);
    case 'LIST':
      return (<ListIcon type={type} />);
    case 'PROFILE':
      return (<ProfileIcon type={type} />);
    default:
      return null as never;
  }
}

export default getIcon;
