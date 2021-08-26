import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../utils/ingredients';

const constructorState = {
  main: [] as Ingredient[],
  bun: undefined as (Ingredient | undefined)
}

const constructor = createSlice({
  name: 'constructor',
  initialState: constructorState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload
      } else {
        state.main.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      const index = state.main.findIndex((item) => item._id === ingredientId);
      if (index >= 0) {
        state.main.splice(index, 1);
      }
    },
    clearIngredients: (state) => {
      state.main = [];
      state.bun = undefined;
    },
    reorderIngredient: (state, action: PayloadAction<[string, number]>) => {
      const [id, index] = action.payload;
      const oldIndex = state.main.findIndex((item) => item._id === id);
      if (oldIndex>= 0 && oldIndex !== index) {
        const [deleted] = state.main.splice(oldIndex, 1);
        state.main.splice(index, 0, deleted);
      }
    }
  }
});

export {
  constructor,
  constructorState
}
