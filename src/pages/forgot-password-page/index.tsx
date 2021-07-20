import React, { FunctionComponent, useState } from 'react';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styles from './forgot-password-page.module.css'

interface OwnProps {}

type Props = OwnProps;

const ForgotPasswordPage: FunctionComponent<Props> = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const onResetClick: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('resetPassword', 'true');
          history.replace({
            pathname: '/reset-password',
            state: {
              email
            }
          });
        }
      })
  };
  const withReset = localStorage.getItem('resetPassword')
  if (withReset === 'true') {
    return (
      <Redirect to="/reset-password" />
    )
  }
  return (
    <form className={styles.ForgotPasswordMain} onSubmit={onResetClick} >
      <div className={styles.Logo}>
        <Logo />
      </div>
      <div className="text text_type_main-default">
        <h2>Восстановление пароля</h2>
      </div>
      <div className={styles.EmailInput}>
        <Input
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="E-mail"
          type="email"
        />
      </div>
      <div>
        <Button>Восстановить</Button>
      </div>
      <div>
        <span>Вспомнили пароль? <Link to="/login">Войти</Link></span>
      </div>
    </form>
  );
};

export default ForgotPasswordPage;
