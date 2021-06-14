import { Ingredient } from './ingredients';
import { ConstructorState } from '../state/state/useConstructorState';

function removeIngredient(state: ConstructorState, ingredientId: string): ConstructorState {
  return {
    ...state,
    main: state.main.filter((e: Ingredient) => e._id !== ingredientId)
  }
}

export default removeIngredient;
