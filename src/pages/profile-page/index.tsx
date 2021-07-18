import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch, StoreType } from '../../services/store';
import { getUserAction, updateUserAction, UserInfo } from '../../services/auth';
import Profile from '../../components/profile';
import styles from './profile-page.module.css'

interface OwnProps {}

type Props = OwnProps;

type IconType = 'EditIcon' | 'CloseIcon';

const ProfilePage: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch<StoreDispatch>();
  useEffect(() => {
    dispatch(getUserAction());
  }, [])
  const {
    name: userName,
    email: userEmail
  } = useSelector<StoreType, UserInfo>(store => store.auth.user);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [nameIcon, setNameIcon] = useState<IconType>('EditIcon');
  const [emailIcon, setEmailIcon] = useState<IconType>('EditIcon');
  const [passIcon, setPassIcon] = useState<IconType>('EditIcon');
  useEffect(() => setName(userName), [userName])
  useEffect(() => setEmail(userEmail), [userEmail])
  const onFocus = useCallback((type: 'name' | 'password' | 'email') => {
    switch (type) {
      case 'email':
        setEmailIcon('CloseIcon');
        break;
      case 'name':
        setNameIcon('CloseIcon');
        break;
      case 'password':
        setPassIcon('CloseIcon')
        break;
      default:
        break;
    }
  }, []);
  const onBlur = useCallback((type: 'name' | 'password' | 'email') => {
    switch (type) {
      case 'email':
        setEmailIcon('EditIcon');
        break;
      case 'name':
        setNameIcon('EditIcon');
        break;
      case 'password':
        setPassIcon('EditIcon')
        break;
      default:
        break;
    }
  }, []);
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
  return (
    <Profile mainBlockClassName={styles.Main}>
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
      <div className={styles.Buttons}>
        <Button type="secondary" onClick={onCancel}>Отмена</Button>
        <Button type="primary" onClick={onSave}>Сохранить</Button>
      </div>
    </Profile>
  );
};

export default ProfilePage;
