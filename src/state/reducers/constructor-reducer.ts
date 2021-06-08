import { ActionType } from '../actions/constructorActions';
import { Ingredient } from '../../utils/ingredients';
import addIngredient from '../../utils/add-ingredient';
import removeIngredient from '../../utils/remove-ingredient';

function constructorReducer(state: Ingredient[] = [], action: ActionType = {}) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return addIngredient(state, action.ingredient);
    case 'REMOVE_INGREDIENT':
      return removeIngredient(state, action.ingredientId);
    case 'CLEAR_INGREDIENTS':
      return []
    default:
      return state;
  }
}

export default constructorReducer;
