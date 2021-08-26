import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import BurgerConstructor from '../burger-constructor';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

jest.mock('../../order-details/order-details', () => () => 'OrderDetails');
jest.mock('../../../services/store');
jest.mock('../../../utils/get-order', () => Promise.resolve({}))
jest.mock('../../burger-constructor-element/burger-constructor-item');

const refs = {};
const getRef = (id) => {
  if (!refs[id]) {
    refs[id] = React.createRef();
  }
  return refs[id];
}

beforeEach(() => {
  const bun = {
    _id: 1,
    price: 2,
    name: 'Bun 01',
    image: 'Bun Image Source'
  };
  const main = [{
    _id: 1,
    price: 2,
    name: 'Bun 01'
  }];
  const store = {
    constructor: {
      bun,
      main
    },
    auth: {
      user: {
        name: 'test name'
      }
    }
  };
  (useSelector as jest.Mock)
    .mockImplementation((fn) => fn(store));
  (useDrop as jest.Mock)
    .mockImplementation((arg) => [undefined, getRef(arg.accept)]);
});

describe('burger-constructor', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<BurgerConstructor />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    expect(useDrop).toBeCalledTimes(4);
  });
});
