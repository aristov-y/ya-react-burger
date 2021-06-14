import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../app-header';
import MainContainer from '../main-container';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-contructor';
import fetchIngredients, { Ingredient } from '../../utils/ingredients';
import { ConstructorProvider } from '../../state/providers/constructor-provider';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    fetchIngredients()
      .then(data => setIngredients(data))
      .catch(err => console.error(err));
  }, [])
  return (
    <div className="App text text_type_main-default">
      <ConstructorProvider>
        <AppHeader />
        <MainContainer>
          <BurgerIngredients
            ingredients={ingredients}
          />
          <BurgerConstructor />
        </MainContainer>
      </ConstructorProvider>
    </div>
  );
}

export default App;
