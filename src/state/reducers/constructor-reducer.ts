import { ActionType } from '../actions/constructorActions';
import { Ingredient } from '../../utils/ingredients';

function removeIngredient(state: Ingredient[], ingredientId: string) {
  const bunsCount = state.filter(e => e._id === ingredientId && e.type === 'bun').length;
  if (bunsCount > 0) {
    if (bunsCount > 1) {
      const index = state.findIndex(e => e._id === ingredientId);
      return state.filter((_, idx) => idx === index);
    } else {
      return state;
    }
  } else {
    const index = state.findIndex(e => e._id === ingredientId);
    if (index >= 0) {
      return state.filter((_, idx) => idx !== index);
    } else {
      return state;
    }
  }
}

function addIngredient(state: Ingredient[], ingredient: Ingredient) {
  if (ingredient.type === 'bun') {
    return [
      ingredient,
      ...state.filter(e => e.type !== 'bun')
    ];
  } else {
    return [
      ...state,
      ingredient
    ];
  }
}

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
