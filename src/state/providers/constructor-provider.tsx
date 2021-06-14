import React, { FunctionComponent, useContext } from 'react';
import useConstructorState from '../state/useConstructorState';

interface OwnProps {}

type Props = OwnProps;

type ContextType = ReturnType<typeof useConstructorState>;

const initialState: ContextType = {
  ingredients: {
    main: []
  },
  addIngredient: () => {},
  removeIngredient: () => {},
  clearIngredients: () => {}
}

const StateContext = React.createContext<ContextType>(initialState);

export const ConstructorProvider: FunctionComponent<Props> = ({ children }) => {
  const { addIngredient, clearIngredients, ingredients, removeIngredient } = useConstructorState();
  return (
    <StateContext.Provider
      value={{ addIngredient, clearIngredients, ingredients, removeIngredient }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useConstructorStateHook = () => useContext(StateContext);
