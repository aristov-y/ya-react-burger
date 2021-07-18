import React, { useEffect } from 'react';
import './App.css';
import AppHeader from '../app-header';
import MainContainer from '../main-container';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-contructor';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile-page';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients, StoreDispatch, StoreType } from '../../services/store';
import { getUserAction } from '../../services/auth';
import ProtectedUnauthorizedRoute from '../protected-unauthorized-route';
import ProtectedRoute from '../protected-route';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Ingredient } from '../../utils/ingredients';
import OrdersPage from '../../pages/orders-page';
import OrderPage from '../../pages/order-page';

function App() {
  const dispatch = useDispatch<StoreDispatch>();
  const location = useLocation<any>();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.background;
  const ingredients = useSelector<StoreType, Ingredient[]>(store => store.ingredients.ingredients);
  useEffect(() => {
    dispatch(getUserAction());
    dispatch(loadIngredients());
  }, []);
  const onModalClose = () => {
    history.replace(background);
  }
  return (
    <div className="App text text_type_main-default">
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <MainContainer style={{ gap: '40px' }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </MainContainer>
        </Route>
        <Route exact path="/ingredient/:id">
          <IngredientDetails items={ingredients} />
        </Route>
        <ProtectedUnauthorizedRoute exact path="/login">
          <LoginPage />
        </ProtectedUnauthorizedRoute>
        <ProtectedUnauthorizedRoute exact path="/register">
          <RegisterPage />
        </ProtectedUnauthorizedRoute>
        <ProtectedUnauthorizedRoute exact path="/forgot-password">
          <ForgotPasswordPage />
        </ProtectedUnauthorizedRoute>
        <ProtectedUnauthorizedRoute exact path="/reset-password">
          <ResetPasswordPage />
        </ProtectedUnauthorizedRoute>
        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/:orderId">
          <OrderPage />
        </ProtectedRoute>
      </Switch>
      { background && (
        <Route
          exact
          path="/ingredient/:id"
          render={() => <Modal onClose={onModalClose} title="Детали ингредиента" >
            <IngredientDetails items={ingredients} />
          </Modal>}
        />)
      }
    </div>
  );
}

export default App;
