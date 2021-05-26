import { Ingredient } from '../../utils/ingredients';
import { ActionType } from '../actions/burgerActions';

type State = {
  ingredients: Ingredient[],
  loading: boolean;
  hasError: boolean;
}

export const defaultState: State = {
  ingredients: [],
  loading: false,
  hasError: false
}

function burgerReducer(state = defaultState, action: ActionType = {}): State {
  switch (action.type) {
    case 'LOAD_INGREDIENTS':
      return {
        ...state,
        loading: true,
        hasError: true
      }
    case 'LOAD_INGREDIENTS_ERROR':
      return {
        ...state,
        hasError: true,
        loading: false
      }
    case 'SET_INGREDIENTS':
      return {
        ...state,
        loading: false,
        ingredients: action.ingredients
      }
    default:
      return state;
  }
}

export default burgerReducer;
