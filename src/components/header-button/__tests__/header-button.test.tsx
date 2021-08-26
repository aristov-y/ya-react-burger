import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import HeaderButton from '../header-button';

jest.mock('@ya.praktikum/react-developer-burger-ui-components', () => ({
  Button: ({ children }) => (<div data-id="Button">{children}</div>)
}));

jest.mock('../getIcon', () => (type) => `Icon:${type}`);

describe('HeaderButton', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<HeaderButton text={'ButtonText'} type={'BURGER'} to={'to-burger'} />)
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(<HeaderButton text={'Text'} type={'PROFILE'} to={'to-profile'} />)
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
