import { create, act, ReactTestRenderer } from 'react-test-renderer';
import getIcon from '../getIcon';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

describe('getIcon', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(getIcon('BURGER'));
    });

    expect(component.toJSON()).toMatchSnapshot();

    const instance = component.root;

    let burger = instance.findByType(BurgerIcon);
    expect(burger.props.type).toBe('secondary');

    act(() => {
      component.update(getIcon('BURGER', true));
    });

    expect(component.toJSON()).toMatchSnapshot();

    burger = instance.findByType(BurgerIcon);
    expect(burger.props.type).toBe('primary');

    act(() => {
      component.update(getIcon('LIST'));
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(getIcon('PROFILE'));
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.update(getIcon(undefined));
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
