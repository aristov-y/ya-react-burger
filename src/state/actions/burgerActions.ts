import { Ingredient } from '../../utils/ingredients';

interface Action {
  type?: string;
}

interface LoadIngredients extends Action {
  type: 'LOAD_INGREDIENTS'
}

interface SetIngredients extends Action {
  type: 'SET_INGREDIENTS'
  ingredients: Ingredient[]
}

interface SetLoadError extends Action {
  type: 'LOAD_INGREDIENTS_ERROR'
}

interface NoAction extends Action {
  type?: never;
}

interface ActionsRegistry {
  LoadIngredients: LoadIngredients;
  SetIngredients: SetIngredients;
  SetLoadError: SetLoadError;
  NoAction: NoAction
}

export type ActionType = ActionsRegistry[keyof ActionsRegistry];

function loadIngredientsAction(): LoadIngredients {
  return {
    type: 'LOAD_INGREDIENTS'
  }
}

function setIngredientsAction(ingredients: Ingredient[]): SetIngredients {
  return {
    type: 'SET_INGREDIENTS',
    ingredients
  }
}

function setLoadErrorAction(): SetLoadError {
  return {
    type: 'LOAD_INGREDIENTS_ERROR'
  }
}

export {
  loadIngredientsAction,
  setIngredientsAction,
  setLoadErrorAction
}
