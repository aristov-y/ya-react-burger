import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedListItem from '../index';
import { useSelector } from 'react-redux';

jest.mock('../../feed-list-ingredients', () => () => 'FeedListIngredients')

const onClick = jest.fn();

const store = {
  ingredients: {
    ingredients: [{
      _id: 'main01',
      price: 10
    }, {
      _id: 'main02',
      price: 13
    }, {
      _id: 'sauce01',
      price: 14
    }]
  }
}

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation(fn => fn(store));
});

describe('FeedListItem', () => {
  it('should render', () => {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedListItem
        number={123}
        name={'Name'}
        createdAt={'2020-01-01T10:01:12'}
        ingredients={['main01', 'main01', 'sauce01']}
        onClick={onClick}
      />)
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
