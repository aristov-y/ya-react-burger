import { create, act, ReactTestRenderer } from 'react-test-renderer';
import AppHeader from '../app-header';
import React from 'react';

jest.mock('@ya.praktikum/react-developer-burger-ui-components', () => ({
  Logo: () => 'Logo'
}));
jest.mock('../../header-button');
jest.mock('react-router-dom', () => ({
  Link: ({ children }: React.PropsWithChildren<any>) => (<div data-itemid="Link">{children}</div>)
}))

describe('app-header', () => {
  it('should render', () => {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<AppHeader />);
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
