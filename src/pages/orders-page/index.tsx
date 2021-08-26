import React, { useEffect } from 'react';
import Profile from '../../components/profile';
import FeedListItem from '../../components/feed-list-item';
import { useStoreDispatch } from '../../services/store';
import styles from './orders-page.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/action-types';
import { useOrdersSelector } from '../../services/selectors';
import { loadOrders } from '../../services/orders';

const wsUrl = `${process.env.REACT_APP_WS_DOMAIN}/orders`

function OrdersPage() {
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(loadOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();
  const location = useLocation();
  const orders = useOrdersSelector();
  const token = getCookie('token');
  useEffect(() => {
    if (token) {
      const parsedToken = token.slice(7)
      dispatch({ type: WS_CONNECTION_START, payload: {
          wsUrl: `${wsUrl}?token=${parsedToken}`,
          wsType: 'orders'
        }
      });
      return () => {
        dispatch({
          type: WS_CONNECTION_CLOSE
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
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
