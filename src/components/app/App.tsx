import React from 'react';
import './App.css';
import AppHeader from '../app-header';
import MainContainer from '../main-container';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-contructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <MainContainer>
        <BurgerIngredients />
        <BurgerConstructor />
      </MainContainer>
    </div>
  );
}

export default App;
