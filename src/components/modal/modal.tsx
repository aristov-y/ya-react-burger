import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

type Props = {
  title?: string;
  onClose: () => void;
}

export default function Modal({ children, title, onClose }: React.PropsWithChildren<Props>) {
  const onKeyPress: React.KeyboardEventHandler = (evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
    console.log(evt.key);
  }
  return (
    <div className={styles['modal']} onKeyUp={onKeyPress}>
      <div className={`${styles['modal__header']} ml-10 mr-10`}>
        <span className={`${styles['modal__title']} text text_type_main-medium`}>{title}</span>
        <CloseIcon type={'primary'} onClick={onClose}/>
      </div>
      {children}
    </div>
  )
}
