import { ActionType } from '../actions/constructorActions';
import addIngredient from '../../utils/add-ingredient';
import removeIngredient from '../../utils/remove-ingredient';
import { ConstructorState } from '../state/useConstructorState';

function constructorReducer(state: ConstructorState, action: ActionType = {}): ConstructorState {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return addIngredient(state, action.ingredient);
    case 'REMOVE_INGREDIENT':
      return removeIngredient(state, action.ingredientId);
    case 'CLEAR_INGREDIENTS':
      return {
        ...state,
        main: []
      }
    default:
      return state;
  }
}

export default constructorReducer;
