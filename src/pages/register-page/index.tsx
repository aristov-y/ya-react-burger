import React, { FunctionComponent, useState } from 'react';
import MainContainer from '../../components/main-container';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../services/auth';
import { StoreDispatch } from '../../services/store';

interface OwnProps {}

type Props = OwnProps;

const RegisterPage: FunctionComponent<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch<StoreDispatch>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    dispatch(registerAction({
      name,
      email,
      password
    }))
      .then(() => {
        history.replace("/");
      })
  }
  return (
    <form className={styles.RegisterContainer} onSubmit={onHandleSubmit}>
      <div>
        <Logo />
      </div>
      <h2 className={styles.H2}>Регистрация</h2>
      <div>
        <Input
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          type="text"
          placeholder="Имя"
        />
      </div>
      <div>
        <Input
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          type="email"
          placeholder="E-mail"
        />
      </div>
      <div>
        <Input
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type={showPass ? 'text' : 'password'}
          placeholder="Пароль"
          icon={showPass ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setShowPass(prev => !prev)}
        />
      </div>
      <div>
        <Button type="primary">Зарегистрироваться</Button>
      </div>
      <div>
        <span>
          {'Уже зарегистрированы '}
          <Link to="/login">Войти</Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterPage;
