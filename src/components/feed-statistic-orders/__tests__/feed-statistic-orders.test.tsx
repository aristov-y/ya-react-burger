import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedStatisticOrders from '../index';

jest.mock('../feed-statistic-orders.module.css', () => ({
  'OrdersList': 'OrdersList',
  'OrdersCompleted': 'OrdersCompleted'
}))

describe('FeedStatisticOrders', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedStatisticOrders
        title={"Title"}
        orders={[2,5]}
      />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(<FeedStatisticOrders
        title={"Title"}
        orders={[3,4]}
        completed
      />)
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
