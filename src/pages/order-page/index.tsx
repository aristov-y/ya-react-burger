import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styles from '../feed-page/feed-page.module.css';
import FeedItemDetails from '../../components/feed-item-details';
import { useOrdersSelector } from '../../services/selectors';

type TParams = {
  orderId: string;
}

function OrderPage() {
  const { params } = useRouteMatch<TParams>();
  const { orderId } = params;
  const orders = useOrdersSelector();
  const item = orders.find(val => val._id === orderId);
  if (item) {
    const feedNum = `${item.number}`.padStart(6, '0');
    const { name, status, ingredients, createdAt } = item;
    return (
      <div className={styles.FeedPage}>
        <div>#{feedNum}</div>
        <FeedItemDetails
          name={name}
          status={status}
          createdAt={createdAt}
          ingredients={ingredients}
        />
      </div>
    );
  }
  return null;
}

export default OrderPage;
