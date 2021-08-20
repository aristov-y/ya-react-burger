import React from 'react';
import Modal from '../modal/modal';
import FeedItemDetails from '../feed-item-details';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import { FeedItem } from '../../utils/orders';
import { useRouteMatch } from 'react-router-dom';

type Props = {
  onClose: () => void;
}

function FeedItemModal({ onClose }: Props) {
  const { params } = useRouteMatch<any>();
  const orderId = params.id;
  const feedItem = useSelector<StoreType, FeedItem | undefined>(
    store => store.feed.feed.find(val => val._id === orderId)
  );
  if (feedItem) {
    const number = `${feedItem.number}`.padStart(6, '0');
    return (
      <Modal onClose={ onClose } title={`#${number}`}>
        <FeedItemDetails
          name={feedItem.name}
          ingredients={feedItem.ingredients}
          createdAt={feedItem.createdAt}
          status={feedItem.status}
        />
      </Modal>
    )
  }
  return null;
}

export default FeedItemModal;
