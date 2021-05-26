interface Ingredient {
  _id: string;
  name: string;
  type: 'main' | 'bun' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

function fetchIngredients(): Promise<Ingredient[]> {
  return window.fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(e => e.json())
    .then(e => e.data);
}

export type {
  Ingredient
}

export default fetchIngredients;
