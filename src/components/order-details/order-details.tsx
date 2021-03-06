import React, { useEffect } from 'react';
import Modal from '../modal/modal';
import styles from './order-details.module.css';
import orderDoneImage from '../../images/order-done.svg';

type Props = {
  onClose: () => void;
  orderNum: number
}

function OrderDetails({ onClose, orderNum }: Props) {
  useEffect(() => {
    new Image().src = orderDoneImage;
  }, []);
  return (
    <Modal onClose={ onClose }>
      <div className={ `${ styles['content'] } text text_type_main-default` }>
            <span className={ `text_type_digits-large mt-2 ${ styles['order-number'] }` }>
              { orderNum }
            </span>
        <span className="mt-8">идентификатор заказа</span>
        <span className="mt-15">
              <img alt="check" src={ orderDoneImage } width={ 120 } height={ 120 }/>
            </span>
        <span className="mt-15">Ваш заказ начали готовить</span>
        <span className="mt-2 mb-30 text_color_inactive">
              Дождитесь готвоности на орбитальной станции
            </span>
      </div>
    </Modal>
  )
}

export default OrderDetails;
