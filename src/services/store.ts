import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { auth } from './auth';
import { feed } from './feed';
import { orders } from './orders';
import { ingredients, loadIngredients, setIngredients, ingredientsState } from './ingredients';
import { constructor, constructorState } from './constructor';
import { socketMiddleware } from './middleware/socketMiddleware';

const wsUrl = `${process.env.REACT_APP_WS_DOMAIN}/orders`

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
  [orders.name]: orders.reducer
}

const store = configureStore({
  reducer,
  preloadedState: {
    constructor: constructorState,
    ingredients: ingredientsState
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([thunk, socketMiddleware(wsUrl)]),
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
