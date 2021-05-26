import { ActionType } from '../actions/constructorActions';
import { Ingredient } from '../../utils/ingredients';

function constructorReducer(state: Ingredient[] = [], action: ActionType) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      if (action.ingredient.type === 'bun') {
        return [
          action.ingredient,
          ...state.filter(e => e.type !== 'bun')
        ];
      } else {
        return [
          ...state,
          action.ingredient
        ];
      }

    case 'REMOVE_INGREDIENT':
      const bunsCount = state.filter(e => e._id === action.ingredientId && e.type === 'bun').length;
      if (bunsCount > 0) {
        if (bunsCount > 1) {
          const index = state.findIndex(e => e._id === action.ingredientId);
          return state.filter((_, idx) => idx === index);
        } else {
          return state;
        }
      } else {
        const index = state.findIndex(e => e._id === action.ingredientId);
        if (index >= 0) {
          return state.filter((_, idx) => idx !== index);
        } else {
          return state;
        }
      }
    default:
      return state;
  }
}

export default constructorReducer;
