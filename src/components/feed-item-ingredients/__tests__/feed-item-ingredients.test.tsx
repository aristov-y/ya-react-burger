import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedItemIngredients from '../index';
import { useSelector } from 'react-redux';

const store = {
  ingredients: {
    ingredients: [{
      _id: 'main01',
      price: 100,
      name: 'Main 01'
    }, {
      _id: 'main02',
      price: 102,
      name: 'Main 02'
    }, {
      _id: 'sauce01',
      price: 103,
      name: 'Sauce 01'
    }, {
      _id: 'sauce02',
      price: 104,
      name: 'Sauce 02'
    }]
  }
}
const ingredients = ['sauce02', 'sauce02', 'main01', 'main02', 'main01', 'sauce02']

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation(fn => fn(store))
});

describe('FeedItemIngredients', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedItemIngredients ingredients={ingredients} />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
