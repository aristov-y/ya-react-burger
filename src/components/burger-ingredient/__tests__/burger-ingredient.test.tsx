import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import BurgerIngredient from '../burger-ingredient';
import { Ingredient } from '../../../utils/ingredients';
import { useDrag } from 'react-dnd';

const item: Ingredient = {
  _id: '1',
  __v: 1,
  price: 100,
  image_large: 'image_large',
  proteins: 123,
  calories: 111,
  fat: 101,
  carbohydrates: 104,
  image: 'image',
  image_mobile: 'image_mobile',
  name: 'Name',
  type: 'main'
}

const onClick = jest.fn();
const onImageClick = jest.fn();

const dragRef = React.createRef();

beforeEach(() => {
  (useDrag as jest.Mock).mockImplementationOnce(() => [undefined, dragRef]);
});

describe('burger-ingredient', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<BurgerIngredient
        item={item}
        count={1}
        onClick={onClick}
        onImageClick={onImageClick}
      />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
