import React from 'react';
import { useRouteMatch } from 'react-router-dom';

function OrderPage() {
  const { params } = useRouteMatch<any>();
  return (
    <span className="text">Заказ: #{params.orderId}</span>
  )
}

export default OrderPage;
