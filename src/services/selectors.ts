import { useSelector } from 'react-redux';
import { Ingredient } from '../utils/ingredients';
import { UserInfo } from './auth';
import { FeedItem } from '../utils/orders';
import { StoreType } from './store';

function useStoreSelector<TSelected>(selector: (state: StoreType) => TSelected) {
  return useSelector<StoreType, TSelected>(selector);
}

function useIngredientsSelector() {
  return useSelector<StoreType, Ingredient[]>(state => state.ingredients.ingredients);
}

function useUserSelector() {
  return useSelector<StoreType, UserInfo>(state => state.auth.user)
}

function useOrdersSelector() {
  return useSelector<StoreType, FeedItem[]>(state => state.orders.orders)
}

function useFeedSelector() {
  return useSelector<StoreType, FeedItem[]>(state => state.feed.feed)
}

function useConstructorSelector() {
  return useSelector<StoreType, StoreType['constructor']>(state => state.constructor)
}

export {
  useStoreSelector,
  useIngredientsSelector,
  useUserSelector,
  useFeedSelector,
  useOrdersSelector,
  useConstructorSelector
}
