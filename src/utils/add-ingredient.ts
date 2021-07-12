import { Ingredient } from './ingredients';
import { ConstructorState } from '../state/state/useConstructorState';

function addIngredient(state: ConstructorState, newIngredient: Ingredient): ConstructorState {
  console.info('add', newIngredient, 'to', state)
  if (newIngredient.type === 'bun') {
    return {
      ...state,
      bun: newIngredient,
    };
  } else {
    return {
      ...state,
      main: [...state.main, newIngredient]
    };
  }
}

export default addIngredient;
