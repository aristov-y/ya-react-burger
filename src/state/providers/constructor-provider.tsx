import React, { FunctionComponent, useContext } from 'react';
import useBurgerState from '../state/useBurgerState';
import useConstructorState from '../state/useConstructorState';

interface OwnProps {}

type Props = OwnProps;

type ContextType = {
  burgerConstructor: Partial<ReturnType<typeof useConstructorState>>;
  burgerIngredients: Partial<ReturnType<typeof useBurgerState>>
}

const StateContext = React.createContext<ContextType>({
  burgerConstructor: {},
  burgerIngredients: {}
});

export const ConstructorProvider: FunctionComponent<Props> = ({ children }) => {
  const burgerConstructor = useConstructorState();
  const burgerIngredients = useBurgerState();
  const value = {
    burgerConstructor,
    burgerIngredients
  };
  return (
    <StateContext.Provider value={value} >
      {children}
    </StateContext.Provider>
  );
};

export const useConstructorHooks = () => useContext(StateContext);
