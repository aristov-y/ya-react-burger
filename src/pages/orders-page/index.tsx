import React from 'react';
import Profile from '../../components/profile';
import FeedListItem from '../../components/feed-list-item';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import styles from './orders-page.module.css';
import { useHistory, useLocation } from 'react-router-dom';

function OrdersPage() {
  const history = useHistory();
  const location = useLocation();
  const { orders } = useSelector<StoreType, StoreType['orders']>(store => store.orders);
  const onShowDetails = (id: string) => {
    history.push({
      pathname: `/profile/orders/${id}`,
      state: {
        order: true,
        background: location
      }
    })
  };
  return (
    <Profile>
      <div className={styles.Scroller}>
        <div className={styles.OrderList}>
          {
            orders.map(val => {
              return (
                <FeedListItem
                  key={val._id}
                  number={val.number}
                  name={val.name}
                  createdAt={val.createdAt}
                  ingredients={val.ingredients}
                  onClick={() => onShowDetails(val._id)}
                />
              )
            })
          }
        </div>
      </div>
    </Profile>
  )
}

export default OrdersPage;
