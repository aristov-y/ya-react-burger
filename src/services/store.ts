import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { auth } from './auth';
import { feed } from './feed';
import { feedStatistic } from './feedStatistic';
import { orders } from './orders';
import { ingredients, loadIngredients, setIngredients, ingredientsState } from './ingredients';
import { constructor, constructorState } from './constructor';
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
    ingredients: ingredientsState
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
