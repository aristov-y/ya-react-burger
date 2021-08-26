import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { StoreType, useStoreDispatch } from '../../services/store';
import { getUserAction, updateUserAction } from '../../services/auth';
import Profile from '../../components/profile';
import styles from './profile-page.module.css'
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreSelector } from '../../services/selectors';

interface OwnProps {}

type Props = OwnProps;

type IconType = 'EditIcon' | 'CloseIcon';

const ProfilePage: FunctionComponent<Props> = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(getUserAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    user: {
      name: userName,
      email: userEmail
    },
    error
  } = useStoreSelector<StoreType['auth']>(store => store.auth);
  if (error) {
    history.replace({
      pathname: `/login`,
      state: {
        order: true,
        background: location
      }
    });
  }
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [nameIcon] = useState<IconType>('EditIcon');
  const [emailIcon] = useState<IconType>('EditIcon');
  const [passIcon] = useState<IconType>('EditIcon');
  useEffect(() => setName(userName), [userName])
  useEffect(() => setEmail(userEmail), [userEmail])
  const onClear = useCallback((type: 'name' | 'password' | 'email', canClose: boolean) => {
    if (canClose) {
      switch (type) {
        case 'password':
          break;
        case 'name':
          setName(userName);
          break;
        case 'email':
          setEmail(userEmail);
          break;
      }
    }
  }, [userEmail, userName]);
  const onCancel = () => {
    setName(userName);
    setEmail(userEmail);
    setPassword('')
  }
  const onSave = () => {
    dispatch(updateUserAction({
      name: name,
      email: email
    }))
  }
  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    onSave();
  }
  return (
    <Profile mainBlockClassName={styles.Main}>
      <form className={styles.MainForm} onSubmit={onHandleSubmit}>
        <div>
          <Input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
            placeholder="Имя"
            icon={nameIcon}
            // onFocus={() => onFocus('name')}
            // onBlur={() => onBlur('name')}
            onIconClick={() => onClear('name', nameIcon === 'CloseIcon')}
          />
        </div>
        <div>
          <Input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            type="text"
            placeholder="E-mail"
            icon={emailIcon}
            // onFocus={() => onFocus('email')}
            // onBlur={() => onBlur('email')}
            onIconClick={() => onClear('email', nameIcon === 'CloseIcon')}
          />
        </div>
        <div>
          <Input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="text"
            placeholder="Пароль"
            icon={passIcon}
            // onFocus={() => onFocus('password')}
            // onBlur={() => onBlur('password')}
            onIconClick={() => onClear('password', nameIcon === 'CloseIcon')}
          />
        </div>
      </form>
      <div className={styles.Buttons}>
        <Button type="secondary" onClick={onCancel}>Отмена</Button>
        <Button type="primary" onClick={onSave}>Сохранить</Button>
      </div>
    </Profile>
  );
};

export default ProfilePage;
