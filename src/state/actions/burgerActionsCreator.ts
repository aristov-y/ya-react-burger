import React from 'react';
import {
  ActionType,
  loadIngredientsAction,
  setIngredientsAction,
  setLoadErrorAction
} from './burgerActions';
import fetchIngredients from '../../utils/ingredients';

export default function burgerActionsCreator(dispatch: React.Dispatch<ActionType>) {
  function loadIngredients() {
    dispatch(loadIngredientsAction());
    fetchIngredients()
      .then(data => {
        dispatch(setIngredientsAction(data));
      })
      .catch(() => {
        dispatch(setLoadErrorAction())
      })
  }
  return {
    loadIngredients
  }
}
