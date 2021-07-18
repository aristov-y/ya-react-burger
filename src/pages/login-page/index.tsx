import React, { FunctionComponent, useState } from 'react';
import MainContainer from '../../components/main-container';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch, StoreType } from '../../services/store';
import { loginAction, UserInfo } from '../../services/auth';

interface OwnProps {}

type Props = OwnProps;

const LoginPage: FunctionComponent<Props> = (props: React.PropsWithChildren<Props>) => {
  const location = useLocation<any>();
  const dispatch = useDispatch<StoreDispatch>()
  const { name } = useSelector<StoreType, UserInfo>(store => store.auth.user)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const onLoginClick = () => {
    dispatch(loginAction({
      email,
      password
    }))
  }
  if (name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Redirect to={from} />
    )
  }
  return (
    <MainContainer vertical className={styles.LoginContainer} style={{ gap: '24px' }}>
      <div>
        <Logo />
      </div>
      <h2 className={styles.H2}>Вход</h2>
      <div>
        <Input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          type="email"
          placeholder="E-mail"
        />
      </div>
      <div>
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type={showPass ? 'text' : 'password'}
          placeholder="Пароль"
          icon={showPass ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setShowPass(prev => !prev)}
        />
      </div>
      <div>
        <Button size="medium" onClick={onLoginClick}>Войти</Button>
      </div>
      <div>
        <span>
          {'Вы - новый пользователь? '}
          <Link to="/register">Зарегистрироваться</Link>
        </span>
      </div>
      <div>
        <span>
          {'Забыли пароль? '}
          <Link to="/forgot-password">Восстановить пароль</Link>
        </span>
      </div>
    </MainContainer>
  );
};

export default LoginPage;
