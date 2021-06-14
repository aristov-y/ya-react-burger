import { useMemo, useReducer } from 'react';
import constructorReducer from '../reducers/constructor-reducer';
import constructorActionsCreator from '../actions/constructorActionsCreator';
import { Ingredient } from '../../utils/ingredients';

interface ConstructorState {
  main: Ingredient[],
  bun?: Ingredient
}

function useConstructorState() {
  const [ingredients, dispatchIngredients] = useReducer(constructorReducer, {
    main: []
  })
  const {
    addIngredient,
    removeIngredient,
    clearIngredients
  } = useMemo(() => constructorActionsCreator(dispatchIngredients), [dispatchIngredients]);

  return {
    ingredients,
    addIngredient,
    removeIngredient,
    clearIngredients
  }
}

export type {
  ConstructorState
}

export default useConstructorState;
