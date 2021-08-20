import {
  configureStore,
  createAsyncThunk,
  createSlice, PayloadAction,
} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import fetchIngredients, { Ingredient } from '../utils/ingredients';
import { auth } from './auth';
import { feed } from './feed';
import { feedStatistic } from './feedStatistic';
import { orders } from './orders';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './action-types';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const wsUrl = `${process.env.REACT_APP_WS_DOMAIN}/orders`

const initialState = {
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
  initialState,
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
})

const {
  clearIngredients,
  reorderIngredient,
  addIngredient,
  removeIngredient
} = constructor.actions;

const reducer = {
  [ingredients.name]: ingredients.reducer,
  [constructor.name]: constructor.reducer,
  [auth.name]: auth.reducer,
  [feed.name]: feed.reducer,
  [feedStatistic.name]: feedStatistic.reducer,
  [orders.name]: orders.reducer
}

const store = configureStore({
  reducer,
  preloadedState: {
    constructor: constructorState,
    ingredients: initialState,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([thunk, socketMiddleware(wsUrl, wsActions)]),
  devTools: process.env.NODE_ENV !== 'production'
})

type StoreType = ReturnType<typeof store.getState>
type StoreDispatch = typeof store.dispatch;

export type {
  StoreType,
  StoreDispatch
}

export {
  setIngredients,
  loadIngredients,
  clearIngredients,
  reorderIngredient,
  addIngredient,
  removeIngredient
}

export default store;
