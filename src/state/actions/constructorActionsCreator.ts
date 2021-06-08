import {
  ActionType,
  addIngredient as addIngredientAction,
  removeIngredient as removeIngredientAction,
  clearIngredients as clearIngredientsAction
} from './constructorActions';
import { Ingredient } from '../../utils/ingredients';
import React from 'react';

export default function constructorActionsCreator(dispatch: React.Dispatch<ActionType>) {
  function addIngredient(ingredient: Ingredient) {
    dispatch(addIngredientAction(ingredient));
  }
  function removeIngredient(ingredientId: string) {
    dispatch(removeIngredientAction(ingredientId));
  }
  function clearIngredients() {
    dispatch(clearIngredientsAction())
  }
  return {
    addIngredient,
    removeIngredient,
    clearIngredients
  }
}
