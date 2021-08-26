import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedListIngredients from '../index';
import FeedListIngredient from '../feed-list-ingredient';

jest.mock('../feed-list-ingredient', () => () => 'FeedListIngredient');
const ingredients = ['1', '1', '2', '3', '4', '5', '6', '7'];
describe('FeedListIngredients', () => {
  it('should render', () => {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedListIngredients ingredients={ingredients} />)
    });

    expect(component.toJSON()).toMatchSnapshot();

    const instance = component.root;
    const items = instance.findAllByType(FeedListIngredient);

    expect(items.length).toBe(6);
    expect(items[0].props.id).toBe('1');
    expect(items[0].props.overLength).toBeUndefined();
    expect(items[0].props.zIndex).toBe(7);
    expect(items[1].props.id).toBe('2');
    expect(items[1].props.overLength).toBeUndefined();
    expect(items[1].props.zIndex).toBe(6);
    expect(items[2].props.id).toBe('3');
    expect(items[2].props.overLength).toBeUndefined();
    expect(items[2].props.zIndex).toBe(5);
    expect(items[3].props.id).toBe('4');
    expect(items[3].props.overLength).toBeUndefined();
    expect(items[3].props.zIndex).toBe(4);
    expect(items[4].props.id).toBe('5');
    expect(items[4].props.overLength).toBeUndefined();
    expect(items[4].props.zIndex).toBe(3);
    expect(items[5].props.id).toBe('6');
    expect(items[5].props.overLength).toBe(1);
    expect(items[5].props.zIndex).toBe(2);
  });
});
