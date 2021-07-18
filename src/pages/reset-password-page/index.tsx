import React, { FunctionComponent, useCallback, useState } from 'react';
import MainContainer from '../../components/main-container';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';

interface OwnProps {}

type Props = OwnProps;

const ResetPasswordPage: FunctionComponent<Props> = (props) => {
  const history = useHistory();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const onResetClick = useCallback(() => {
    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        token,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          history.replace({
            pathname: "/login"
          })
        }
      })
  }, [token, password, history]);
  return (
    <MainContainer vertical>
      <div>
        <Logo />
      </div>
      <div>
        <h2>Восстановление пароля</h2>
      </div>
      <div>
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type={showPass ? 'text' : 'password'}
          placeholder="Введите новый пароль"
          icon={showPass ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setShowPass(prev => !prev)}
        />
      </div>
      <div>
        <Input
          value={token}
          onChange={(ev) => setToken(ev.target.value)}
          placeholder="Введите код из письма"
          type="text"
        />
      </div>
      <div>
        <Button onClick={onResetClick}>Восстановить</Button>
      </div>
      <div>
        <span>Вспомнили пароль? <Link to="/login">Войти</Link></span>
      </div>
    </MainContainer>
  );
};

export default ResetPasswordPage;
