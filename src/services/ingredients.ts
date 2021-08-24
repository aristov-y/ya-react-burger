import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchIngredients, { Ingredient } from '../utils/ingredients';

const ingredientsState = {
  ingredients: [] as Ingredient[],
  loading: false,
  hasError: false,
};

const loadIngredients = createAsyncThunk(
  'ingredients/load',
  async () => {
    return fetchIngredients();
  }
);

const ingredients = createSlice({
  name: 'ingredients',
  initialState: ingredientsState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.ingredients = [];
        state.loading = false;
        state.hasError = true;
      })
  }
})

const { setIngredients } = ingredients.actions;

export {
  ingredients,
  setIngredients,
  loadIngredients,
  ingredientsState
}
