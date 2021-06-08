import { useMemo, useReducer } from 'react';
import burgerReducer, { defaultState } from '../reducers/burger-reducer';
import burgerActionsCreator from '../actions/burgerActionsCreator';

function useBurgerState() {
  const [{ ingredients, loading, hasError }, dispatch] = useReducer(burgerReducer, defaultState);
  const { loadIngredients } = useMemo(
    () => burgerActionsCreator(dispatch),
    [dispatch]
  );

  return {
    ingredients,
    loading,
    hasError,
    loadBurgerIngredients: loadIngredients
  }
}

export default useBurgerState;
