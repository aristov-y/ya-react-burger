import store from '../store';
import { loadOrders, orders } from '../orders';
import { fetchUserOrders } from '../../utils/orders';

const { resetState } = orders.actions;

jest.mock('../../utils/orders', () => ({
  fetchUserOrders: jest.fn()
}))

beforeEach(() => {
  store.dispatch(resetState());
});

describe('orders slice', () => {
  it('should load orders', async () => {
    const response = [{
      _id: '1',
      status: 'done'
    }, {
      _id: '2',
      status: 'pending'
    }];
    (fetchUserOrders as jest.Mock).mockImplementation(() => Promise.resolve(response));

    await store.dispatch(loadOrders());

    const state = store.getState().orders;

    expect(state.orders.length).toBe(2);
    expect(state.orders[0]._id).toBe('1');
    expect(state.orders[0].status).toBe('done');
    expect(state.orders[1]._id).toBe('2');
    expect(state.orders[1].status).toBe('pending');
  });
});
