import store from '../store';
import { updateFeedAction, loadFeed } from '../feed';
import { fetchFeed } from '../../utils/orders';

jest.mock('../../utils/orders', () => ({
  fetchFeed: jest.fn()
}))

describe('feed slice', () => {
  it('should load feed', async () => {
    const response = {
      success: true,
      orders: [{
        _id: "1",
        status: 'pending'
      }],
      total: 10,
      totalToday: 1
    };
    (fetchFeed as jest.Mock).mockImplementation(() => Promise.resolve(response));

    await store.dispatch(loadFeed());

    const state = store.getState().feed;
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(1);
    expect(state.feed.length).toBe(1);
    expect(state.feed[0]._id).toBe('1');
    expect(state.feed[0].status).toBe('pending');
  });
  it('should update feed', () => {
    const updatedFeed = {
      success: true,
      orders: [{
        _id: "1",
        status: 'done'
      }, {
        _id: '2',
        status: 'done'
      }],
      total: 11,
      totalToday: 2
    };
    store.dispatch(updateFeedAction(updatedFeed));

    const state = store.getState().feed;
    expect(state.total).toBe(11);
    expect(state.totalToday).toBe(2);
    expect(state.feed.length).toBe(2);
    expect(state.feed[0]._id).toBe('2');
    expect(state.feed[0].status).toBe('done');
    expect(state.feed[1]._id).toBe('1');
    expect(state.feed[1].status).toBe('done');
  });
});
