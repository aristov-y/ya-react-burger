import React, { useCallback } from 'react';
import FeedListItem from '../feed-list-item';
import styles from './feed-list.module.css';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import classNames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {
  className?: string;
}

export default function FeedList({ className }: Props) {
  const location = useLocation();
  const history = useHistory();
  const { feed } = useSelector<StoreType, StoreType["feed"]>(state => state.feed);
  const onShowDetails = useCallback((id: string) => {
    history.push({
      pathname: `/feed/${id}`,
      state: {
        order: true,
        background: location
      }
    })
  }, [history, location]);
  return (
    <div className={classNames(styles.FeedListScroller, className)}>
      <div className={styles.FeedList}>
        {
          feed.map(val => {
            return (
              <FeedListItem
                key={val._id}
                name={val.name}
                number={val.number}
                createdAt={val.createdAt}
                ingredients={val.ingredients}
                onClick={() => onShowDetails(val._id)}
              />
            )
          })
        }
      </div>
    </div>
  )
}
