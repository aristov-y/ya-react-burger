import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import BurgerIngredients from '../burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('../burger-ingredients-section', () => () => 'BurgerIngredientsSection');
const store = {
  ingredients: {
    ingredients: []
  }
}

const dispatch = jest.fn();

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation((fn) => fn(store));
  (useDispatch as jest.Mock).mockImplementation(() => dispatch);
});

describe('burger-ingredients', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<BurgerIngredients className={"test-class"} />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
