import React, { useEffect } from 'react';
import './app.module.css';
import AppHeader from '../app-header';
import MainContainer from '../main-container';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-contructor';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { loadIngredients, useStoreDispatch } from '../../services/store';
import { getUserAction } from '../../services/auth';
import ProtectedUnauthorizedRoute from '../protected-unauthorized-route';
import ProtectedRoute from '../protected-route';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedUnauthorizedRouteWithReset from '../protected-unauthorized-route-with-reset';
import {
  LoginPage, RegisterPage, ResetPasswordPage, ProfilePage,
  OrdersPage, OrderPage, FeedListPage, FeedPage
} from '../../pages'
import { loadFeed } from '../../services/feed';
import FeedItemModal from '../feed-item-modal';
import OrderModal from '../order-modal';
import { loadOrders } from '../../services/orders';
import { useIngredientsSelector } from '../../services/selectors';

type LocationBasic = ReturnType<typeof useLocation>

type LocationState = {
  background: LocationBasic
}

function App() {
  const dispatch = useStoreDispatch();
  const location = useLocation<LocationState>();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.background;
  const ingredients = useIngredientsSelector();
  useEffect(() => {
    dispatch(getUserAction());
    dispatch(loadIngredients());
    dispatch(loadFeed());
    dispatch(loadOrders());
  }, [dispatch]);
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
        <Route exact path="/feed">
          <FeedListPage />
        </Route>
        <Route exact path="/feed/:feedId">
          <FeedPage />
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
        <ProtectedUnauthorizedRouteWithReset exact path="/reset-password">
          <ResetPasswordPage />
        </ProtectedUnauthorizedRouteWithReset>
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
        <>
          <Route
            exact
            path="/ingredient/:id"
            render={() => <Modal onClose={onModalClose} title="???????????? ??????????????????????" >
              <IngredientDetails items={ingredients} />
            </Modal>}
          />
          <Route
            exact
            path="/feed/:id"
            render={() => <FeedItemModal onClose={onModalClose} />}
          />
          <Route
            exact
            path="/profile/orders/:id"
            render={() => <OrderModal onClose={onModalClose} />}
          />
        </>)
      }
    </div>
  );
}

export default App;
