import { useMemo, useReducer } from 'react';
import ConstructorReducer from '../reducers/constructor-reducer';
import actionsCreator from '../actions/actionsCreator';

function useConstructorState() {
  const [ingredients, dispatchIngredients] =useReducer(ConstructorReducer, [])
  const {
    addIngredient,
    removeIngredient
  } = useMemo(() => actionsCreator(dispatchIngredients), [dispatchIngredients]);

  return {
    ingredients,
    addIngredient,
    removeIngredient
  }
}

export default useConstructorState;
