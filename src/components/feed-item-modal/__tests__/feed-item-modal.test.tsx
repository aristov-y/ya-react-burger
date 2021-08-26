import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import FeedItemModal from '../index';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FeedItemDetails from '../../feed-item-details';
import Modal from '../../modal/modal';

jest.mock('../../feed-item-details', () => () => (<div data-id="FeedItemDetails" />))
jest.mock('../../modal/modal')


const store = {
  feed: {
    feed: [{
      _id: 'Item01',
      name: 'Burger',
      ingredients: ['main01'],
      createdAt: 'createdAt',
      status: 'pending',
      number: 123
    }]
  }
}

const route = {
  params: {
    id: 'Item01'
  }
}

beforeEach(() => {
  (useRouteMatch as jest.Mock).mockImplementation(() => (route));
  (useSelector as jest.Mock).mockImplementation(fn => fn(store))
});

describe('FeedItemModal', function () {
  it('should render', function () {
    let component: ReactTestRenderer;
    act(() => {
      component = create(<FeedItemModal onClose={() => {}} />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    const instance = component.root;
    const details = instance.findByType(FeedItemDetails);

    expect(details.props.name).toBe('Burger');
    expect(details.props.createdAt).toBe('createdAt');
    expect(details.props.status).toBe('pending');
    expect(details.props.ingredients).toEqual(expect.arrayContaining(['main01']));

    const modal = instance.findByType(Modal);
    expect(modal.props.title).toBe('#000123')
  });
});
