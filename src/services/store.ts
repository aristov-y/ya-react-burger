import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { auth } from './auth';
import { feed } from './feed';
import { orders } from './orders';
import { ingredients, loadIngredients, setIngredients, ingredientsState } from './ingredients';
import { constructor, constructorState } from './constructor';
import { socketMiddleware } from './middleware/socketMiddleware';
import { useDispatch } from 'react-redux';

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
    getDefaultMiddleware().concat([thunk, socketMiddleware()]),
  devTools: process.env.NODE_ENV !== 'production'
})

type StoreType = ReturnType<typeof store.getState>
type StoreDispatch = typeof store.dispatch;

const useStoreDispatch = () => useDispatch<StoreDispatch>()

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
  removeIngredient,
  useStoreDispatch
}

export default store;
