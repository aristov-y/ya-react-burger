import store from '../store';
import { constructor } from '../constructor';

const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  reorderIngredient
} = constructor.actions;

function getBun(id: string = "1"): any {
  return {
    _id: id,
    type: "bun"
  }
}

function getSauce(id = "2"): any {
  return {
    _id: id,
    type: 'sauce'
  }
}

beforeEach(() => {
  // Да. это странно пользоваться тут тем, что проверяется
  store.dispatch(clearIngredients());
});

describe('constructor slice', () => {
  it('should add bun ingredient', () => {
    let state = store.getState().constructor;
    expect(state.bun).toBeFalsy();

    store.dispatch(addIngredient(getBun()));

    state = store.getState().constructor;
    expect(state.bun).toBeTruthy();
    expect(state.bun._id).toBe("1");
  });
  it('should add sauce ingredient', () => {
    let state = store.getState().constructor;
    expect(state.bun).toBeFalsy();
    expect(state.main.length).toBe(0);

    store.dispatch(addIngredient(getSauce()));

    state = store.getState().constructor;
    expect(state.bun).toBeFalsy();
    expect(state.main.length).toBe(1);
    expect(state.main[0]._id).toBe("2");
  });
  it('should clear ingredients', () => {
    store.dispatch(addIngredient(getBun("3")));
    store.dispatch(addIngredient(getSauce("4")));
    store.dispatch(addIngredient(getSauce("5")));

    let state = store.getState().constructor;
    expect(state.bun).toBeTruthy();
    expect(state.main.length).toBe(2);

    store.dispatch(clearIngredients());

    state = store.getState().constructor;
    expect(state.bun).toBeFalsy();
    expect(state.main.length).toBe(0);
  });
  it('should remove ingredient', () => {
    store.dispatch(addIngredient(getSauce("4")));
    store.dispatch(addIngredient(getSauce("5")));

    let state = store.getState().constructor;
    expect(state.main.length).toBe(2);

    store.dispatch(removeIngredient("4"));
    state = store.getState().constructor;
    expect(state.main.length).toBe(1);
    expect(state.main[0]._id).toBe("5")
  });
  it('should reorder', () => {
    store.dispatch(addIngredient(getSauce("4")));
    store.dispatch(addIngredient(getSauce("5")));
    store.dispatch(addIngredient(getSauce("6")));
    store.dispatch(addIngredient(getSauce("7")));

    let state = store.getState().constructor;
    expect(state.main.length).toBe(4);
    expect(state.main[0]._id).toBe("4");
    expect(state.main[1]._id).toBe("5");
    expect(state.main[2]._id).toBe("6");
    expect(state.main[3]._id).toBe("7");

    store.dispatch(reorderIngredient(["5", 3]));

    state = store.getState().constructor;
    expect(state.main.length).toBe(4);
    expect(state.main[0]._id).toBe("4");
    expect(state.main[1]._id).toBe("6");
    expect(state.main[2]._id).toBe("7");
    expect(state.main[3]._id).toBe("5");
  });
});
