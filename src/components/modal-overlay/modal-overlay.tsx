import React, { useRef } from 'react';
import styles from './modal-overlay.module.css';

type Props = {
  onClick?: () => void;
}

export default function ModalOverlay({ children, onClick }: React.PropsWithChildren<Props>) {
  const ref = useRef<HTMLDivElement>(null);
  const onOverlayClick: React.MouseEventHandler = (evt) => {
    evt.stopPropagation();
    if (onClick) {
      if (evt.target === ref.current) {
        onClick();
      }
    }
  }
  return (
    <div ref={ref} className={styles['modal-overlay']} onClick={onOverlayClick}>
      {children}
    </div>
  )
}
