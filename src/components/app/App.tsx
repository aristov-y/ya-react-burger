import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../app-header';
import MainContainer from '../main-container';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-contructor';
import fetchIngredients, { Ingredient } from '../../utils/ingredients';
import addIngredient from '../../utils/add-ingredient';
import removeIngredient from '../../utils/remove-ingredient';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [constructorItems, setConstructorItems] = useState<Ingredient[]>([])
  useEffect(() => {
    fetchIngredients()
      .then(data => setIngredients(data))
      .catch(err => console.error(err));
  }, [])
  const add = useCallback((value: Ingredient) => {
    setConstructorItems(addIngredient(constructorItems, value));
  }, [constructorItems]);
  const remove = useCallback((id: string) => {
    setConstructorItems(removeIngredient(constructorItems, id));
  }, [constructorItems]);
  const clear = () => {
    setConstructorItems([]);
  }
  return (
    <div className="App text text_type_main-default">
      <AppHeader />
      <MainContainer>
        <BurgerIngredients
          ingredients={ingredients}
          addIngredient={add}
          constructorItems={constructorItems}
        />
        <BurgerConstructor
          items={constructorItems}
          removeItem={remove}
          clearItems={clear} />
      </MainContainer>
    </div>
  );
}

export default App;
