import React, { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import Portal from '../portal/portal';
import ModalOverlay from '../modal-overlay/modal-overlay';

type Props = {
  title?: string;
  onClose: () => void;
}

export default function Modal({ children, title, onClose }: React.PropsWithChildren<Props>) {
  useEffect(() => {
    function onKeyPress(evt: any) {
      if (evt.key === 'Escape') {
        onClose();
      }
      console.log(evt.key);
    }
    document.addEventListener('keyup', onKeyPress);
    return () => {
      document.removeEventListener('keyup', onKeyPress);
    }
  }, [onClose]);
  return (
    <Portal id={'modal'}>
      <ModalOverlay onClick={onClose}>
        <div className={styles['modal']}>
          <div className={`${styles['modal__header']} ml-10 mr-10 mt-10`}>
            <span className={`${styles['modal__title']} text text_type_main-medium`}>{title}</span>
            <CloseIcon type={'primary'} onClick={onClose}/>
          </div>
          {children}
        </div>
      </ModalOverlay>
    </Portal>
  )
}
