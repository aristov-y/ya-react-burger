import React from 'react';
import './App.css';
import AppHeader from './components/app-header';
import MainContainer from './components/main-container';
import BurgerIngredients from './components/burger-ingredients';
import BurgerConstructor from './components/burger-contructor';

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
