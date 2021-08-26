import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import BurgerConstructorItem from '../burger-constructor-item';
import { Ingredient } from '../../../utils/ingredients';
import { useDrag, useDrop } from 'react-dnd';

const mockDragRef = jest.fn();
const mockDropRef = jest.fn();
const mockUseDispatch = jest.fn();
const mockRemoveIngredient = jest.fn();
const mockReorderIngredient = jest.fn();

jest.mock('../../../services/store', () => ({
  __esModule: true,
  removeIngredient: function(...args: any[]) {
    return mockRemoveIngredient.call(this, ...args)
  },
  reorderIngredient: function(...args: any[]) { return mockReorderIngredient.call(this, ...args)}
}));
jest.mock('react-redux', () => ({
   useDispatch: function(...args: any[]) { return mockUseDispatch.call(this, ...args)}
}));

beforeEach(() => {
  (useDrag as jest.Mock).mockImplementation(() => [undefined, mockDragRef]);
  (useDrop as jest.Mock).mockImplementation(() => [undefined, mockDropRef]);
  mockUseDispatch.mockClear();
  mockRemoveIngredient.mockClear();
  mockReorderIngredient.mockClear();
});

const item: Ingredient = {
  _id: "1",
  type: 'main',
  price: 2,
  name: 'name',
  image: 'image',
  image_mobile: 'image_mobile',
  fat: 123,
  calories: 124,
  carbohydrates: 11,
  proteins: 0,
  image_large: 'image_large',
  __v: 1
}

describe('burger-constructor-item', function () {
  it('should render', function () {
    let component: ReactTestRenderer | null = null;
    act(() => {
      component = create(<BurgerConstructorItem item={item} index={2} />);
    });

    expect(component !== null).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();

    expect(useDrag).toBeCalledTimes(1);
  });
});
