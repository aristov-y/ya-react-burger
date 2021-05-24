import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import HeaderButton from '../header-button';

function AppHeader() {
  return (
    <header className={styles['app-header']}>
      <Logo />
      <nav className={styles['app-header-nav']}>
        <HeaderButton text="Конструктор" type="BURGER" />
        <HeaderButton text="Лента заказов" type="LIST" />
      </nav>
      <div className={styles['app-header-profile-wrapper']}>
        <HeaderButton text="Личный кабинет" type="PROFILE" />
      </div>
    </header>
  )
}

export default AppHeader
