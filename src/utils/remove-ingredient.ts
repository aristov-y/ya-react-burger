import { Ingredient } from './ingredients';

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

export default removeIngredient;
