import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedItemDetails from '../index';
import { useSelector } from 'react-redux';

jest.mock('../../feed-item-ingredients', () => () => 'FeedItemIngredients')

const store = {
  ingredients: {
    ingredients: [{
      _id: 'main01',
      price: 10
    }, {
      _id: 'main02',
      price: 12
    }]
  }
}

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation(fn => fn(store));
});

describe('FeedItemDetails', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedItemDetails
        name={"Name 1"}
        status={"pending"}
        createdAt={"2020-01-01T00:00:00"}
        ingredients={["main01"]}
      />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(<FeedItemDetails
        name={"Name 2"}
        status={"done"}
        createdAt={"2020-01-02T00:00:00"}
        ingredients={["main01", "main02"]}
      />)
    })

    expect(component.toJSON()).toMatchSnapshot();
  });
});
