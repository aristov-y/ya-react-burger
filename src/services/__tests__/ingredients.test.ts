import store from '../store';
import { loadIngredients } from '../ingredients';
import fetchIngredients from '../../utils/ingredients';

const mockFetchIngredients = (fetchIngredients as jest.Mock)

jest.mock('../../utils/ingredients', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('ingredients slice', () => {
  it('should load ingredients', async () => {
    mockFetchIngredients.mockImplementation(() => Promise.resolve([{
      _id: "1",
      name: "Name 1"
    }, {
      _id: "2",
      name: "Name 2"
    }]));

    let state = store.getState().ingredients;
    expect(state.ingredients.length).toBe(0);

    await store.dispatch(loadIngredients());

    state = store.getState().ingredients;
    expect(state.ingredients.length).toBe(2);
    expect(state.ingredients[0]._id).toBe("1");
    expect(state.ingredients[0].name).toBe("Name 1");
    expect(state.ingredients[1]._id).toBe("2");
    expect(state.ingredients[1].name).toBe("Name 2");
  })
})
