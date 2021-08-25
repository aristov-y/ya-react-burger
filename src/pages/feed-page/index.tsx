import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styles from './feed-page.module.css';
import FeedItemDetails from '../../components/feed-item-details';
import { useFeedSelector } from '../../services/selectors';

type TParams = {
  feedId: string;
}

function FeedPage() {
  const { params } = useRouteMatch<TParams>();
  const { feedId } = params;
  const feed = useFeedSelector();
  const item = feed.find(val => val._id === feedId);
  if (item) {
    const feedNum = `${ item.number }`.padStart(6, '0');
    const { name, status, ingredients, createdAt } = item;
    return (
      <div className={ styles.FeedPage }>
        <div>#{ feedNum }</div>
        <FeedItemDetails
          name={ name }
          status={ status }
          createdAt={ createdAt }
          ingredients={ ingredients }
        />
      </div>
    );
  }
  return null;
}

export default FeedPage;
