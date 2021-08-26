import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedList from '../index';
import { useSelector } from 'react-redux';
import FeedListItem from '../../feed-list-item';

const store = {
  feed: {
    feed: [{
      _id: '1',
      name: 'Name',
      number: 122,
      createdAt: 'createdAt',
      ingredients: ['main01']
    }]
  }
}

jest.mock('../../feed-list-item', () => () => 'FeedListItem');

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation(fn => fn(store));
});

describe('FeedList', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedList />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    const instance = component.root;
    
    const item = instance.findByType(FeedListItem);

    expect(item.props.name).toBe('Name');
    expect(item.props.number).toBe(122);
    expect(item.props.createdAt).toBe('createdAt');
  });
});
