import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedListIngredient from '../feed-list-ingredient';
import { useSelector } from 'react-redux';

const store = {
  ingredients: {
    ingredients: [{
      _id: '1',
      name: 'Name',
      image: 'ImageSource'
    }]
  }
}

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation(fn => fn(store));
});

describe('FeedListIngredient', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedListIngredient id={"1"} />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(<FeedListIngredient id={"2"} />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(<FeedListIngredient id={"1"} zIndex={2} />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(<FeedListIngredient id={"1"} zIndex={2} overLength={3} />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
