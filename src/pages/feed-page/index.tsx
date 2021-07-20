import React  from 'react';
import { useRouteMatch } from 'react-router-dom';


const FeedPage = () => {
  const { params } = useRouteMatch<any>();
  const { feedId } = params;
  return (
    <div className="text text_type_main-default">Заказ: {feedId}</div>
  );
};

export default FeedPage;
