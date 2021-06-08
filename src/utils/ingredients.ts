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
  return window.fetch(`${process.env.REACT_APP_API_DOMAIN}/api/ingredients`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.statusText)
    })
    .then(jsonData => jsonData.data);
}

export type {
  Ingredient
}

export default fetchIngredients;
