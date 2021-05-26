import { useMemo, useReducer } from 'react';
import ConstructorReducer from '../reducers/constructor-reducer';
import constructorActionsCreator from '../actions/constructorActionsCreator';

function useConstructorState() {
  const [ingredients, dispatchIngredients] =useReducer(ConstructorReducer, [])
  const {
    addIngredient,
    removeIngredient
  } = useMemo(() => constructorActionsCreator(dispatchIngredients), [dispatchIngredients]);

  return {
    ingredients,
    addIngredient,
    removeIngredient
  }
}

export default useConstructorState;
