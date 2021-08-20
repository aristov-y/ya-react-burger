import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreType } from '../../services/store';
import { FeedItem } from '../../utils/orders';
import Modal from '../modal/modal';
import FeedItemDetails from '../feed-item-details';

type Props = {
  onClose: () => void;
}

function OrderModal({ onClose }: Props) {
  const { params } = useRouteMatch<any>();
  const orderId = params.id;
  const orderItem = useSelector<StoreType, FeedItem | undefined>(
    store => store.orders.orders.find(val => val._id === orderId)
  );
  if (orderItem) {
    const number = `${orderItem.number}`.padStart(6, '0');
    return (
      <Modal onClose={ onClose } title={`#${number}`}>
        <FeedItemDetails
          name={orderItem.name}
          ingredients={orderItem.ingredients}
          createdAt={orderItem.createdAt}
          status={orderItem.status}
        />
      </Modal>
    )
  }
  return null
}

export default OrderModal;
