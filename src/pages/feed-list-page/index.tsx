import React from 'react';
import FeedList from '../../components/feed-list';
import styles from './feed-list-page.module.css';
import FeedStatistics from '../../components/feed-statistics';

function FeedListPage() {
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
