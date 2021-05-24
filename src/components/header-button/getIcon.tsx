import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

function getIcon(type: 'BURGER' | 'LIST' | 'PROFILE') {
  switch (type) {
    case 'BURGER':
      return (<BurgerIcon type="primary"/>);
    case 'LIST':
      return (<ListIcon type="primary"/>);
    case 'PROFILE':
      return (<ProfileIcon type="primary"/>);
    default:
      return null as never;
  }
}

export default getIcon;
