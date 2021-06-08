import { Ingredient } from './ingredients';

function addIngredient(ingredients: Ingredient[], newIngredient: Ingredient) {
  if (newIngredient.type === 'bun') {
    return [
      newIngredient,
      ...ingredients.filter(e => e.type !== 'bun')
    ];
  } else {
    return [
      ...ingredients,
      newIngredient
    ];
  }
}

export default addIngredient;
