import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import BurgerIngredientsSection from '../burger-ingredients-section';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

jest.mock('../../burger-ingredient')

const onShowDetails = jest.fn();

const items: any[] = [{
  _id: 'Bun01',
}, {
  _id: 'Main01'
}, {
  _id: 'Main02'
}, {
  _id: 'Sauce01'
}];

const store = {
  constructor: {
    bun: {
      _id: 'Bun01'
    },
    main: [{
      _id: 'Main01'
    }, {
      _id: 'Sauce01'
    }, {
      _id: 'Sauce01'
    }]
  }
}

beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation((fn) => fn(store));
  (useDrag as jest.Mock).mockImplementation(() => []);
});

describe('burger-ingredients-section', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<BurgerIngredientsSection
        onShowDetails={onShowDetails}
        title={'Title'}
        items={items}
      />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
