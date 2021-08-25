import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FeedList from '../../components/feed-list';
import styles from './feed-list-page.module.css';
import FeedStatistics from '../../components/feed-statistics';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/action-types';

const wsUrl = `${process.env.REACT_APP_WS_DOMAIN}/orders/all`

function FeedListPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        wsUrl: wsUrl,
        wsType: 'feed'
      }
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    }
  }, []);
  return (
    <div className={`text text_type_main-default ${styles.FeedListPage}`}>
      <h3>Лента заказов</h3>
      <div className={styles.FeedListPageContent}>
        <FeedList />
        <FeedStatistics />
      </div>

    </div>
  )
}

export default FeedListPage;
