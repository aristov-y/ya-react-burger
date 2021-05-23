import React, { FunctionComponent, useContext } from 'react';
import useConstructorState from '../state/useConstructorState';

interface OwnProps {}

type Props = OwnProps;

type ContextType = {
  burgerConstructor: Partial<ReturnType<typeof useConstructorState>>;
}

const StateContext = React.createContext<ContextType>({
  burgerConstructor: {}
});

export const ConstructorProvider: FunctionComponent<Props> = ({ children }) => {
  const burgerConstructor = useConstructorState();
  const value = {
    burgerConstructor
  };
  return (
    <StateContext.Provider value={value} >
      {children}
    </StateContext.Provider>
  );
};

export const useConstructorHooks = () => useContext(StateContext);
