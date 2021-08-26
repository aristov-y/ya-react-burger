import React from 'react';
import classNames from 'classnames';
import styles from './feed-statistic-orders.module.css';

type Props = {
  title: string;
  orders: number[];
  completed?: boolean;
}

function FeedStatisticOrders({ title, orders, completed = false }: Props) {
  return (
    <div className={styles.Orders}>
      <span className={'text text_type_main-medium'}>{title}</span>
      <div className={classNames(styles.OrdersList, completed && styles.OrdersCompleted)}>
        {
          orders.map(val => (
            <span key={val} className="text text_type_digits-default" >
              {`${val}`.padStart(6, '0')}
            </span>
          ))
        }
      </div>
    </div>
  )
}

export default FeedStatisticOrders;
