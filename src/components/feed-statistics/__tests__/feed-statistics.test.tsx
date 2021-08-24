import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedStatistics from '../index';
import { useSelector } from 'react-redux';

const store = {
  feed: {
    total: 2002,
    totalToday: 34,
    feed: [{
      status: 'pending',
      createdAt: '2020-01-01T10:12:00',
      number: 2
    }, {
      status: 'done',
      createdAt: '2020-01-01T10:13:00',
      number: 3
    }, {
      status: 'pending',
      createdAt: '2020-01-01T10:14:00',
      number: 4
    }, {
      status: 'done',
      createdAt: '2020-01-01T10:10:00',
      number: 1
    }]
  }
}

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation(fn => fn(store));
});

describe('FeedStatisticOrders', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedStatistics />)
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
