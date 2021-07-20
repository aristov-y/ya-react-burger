import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import HeaderButton from '../header-button';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={styles['app-header']}>
      <nav className={styles['app-header-nav']}>
        <HeaderButton text="Конструктор" type="BURGER" to="/" />
        <HeaderButton text="Лента заказов" type="LIST" to="/feed" />
      </nav>
      <Link to="/" className={styles['app-header-logo']}>
        <Logo />
      </Link>
      <div className={styles['app-header-profile-wrapper']}>
        <HeaderButton text="Личный кабинет" type="PROFILE" to="/profile"/>
      </div>
    </header>
  )
}

export default React.memo(AppHeader);
