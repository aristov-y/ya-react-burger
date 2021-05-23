import { Ingredient } from '../../utils/ingredients';

interface Action {
  type: string;
}

interface AddIngredientAction extends Action {
  type: 'ADD_INGREDIENT',
  ingredient: Ingredient
}

interface RemoveIngredientAction extends Action {
  type: 'REMOVE_INGREDIENT',
  ingredientId: string
}

interface ActionsRegistry {
  AddIngredientAction: AddIngredientAction,
  RemoveIngredientAction: RemoveIngredientAction
}

export type ActionType = ActionsRegistry[keyof ActionsRegistry]

export const addIngredient = (ingredient: Ingredient) => ({
  type: 'ADD_INGREDIENT',
  ingredient
} as AddIngredientAction);

export const removeIngredient = (ingredientId: string) => ({
  type: 'REMOVE_INGREDIENT',
  ingredientId
} as RemoveIngredientAction)
