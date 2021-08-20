import React from 'react';
import styles from './feed-statistics.module.css';
import FeedStatisticOrders from '../feed-statistic-orders';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';

function FeedStatistics() {
  const {
    total, totalToday, feed
  } = useSelector<StoreType, StoreType['feed']>(store => store.feed);
  const inProgress = feed.filter(val => val.status === 'pending').map(val => val.number);
  const completed = feed.filter(val => val.status === 'done')
    .sort((a,b) => {
      return new Date(b.createdAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .map(val => val.number)
    .slice(0, 5);
  return (
    <div className={`${styles.FeedStatistic} text`}>
      <div className={styles.FeedStatisticOrders}>
        <FeedStatisticOrders title="Готовы:" orders={completed} completed/>
        <FeedStatisticOrders title="В работе:" orders={inProgress}/>
      </div>
      <div className={styles.FeedStatisticTotal}>
        <span className="text_type_main-medium">Выполнено за все время:</span>
        <span className="text text_type_digits-large">{total}</span>
      </div>
      <div className={styles.FeedStatisticTotal}>
        <span className="text_type_main-medium">Выполнено за сегодня:</span>
        <span className="text text_type_digits-large">{totalToday}</span>
      </div>
    </div>
  )
}

export default FeedStatistics;
