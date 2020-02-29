import React, { useReducer, createContext } from "react";

// Reducers
import {
  authInitialState,
  authReducer
} from "../reducers/reducers/AuthReducer";

const StateContext = createContext();
const DispatchContext = createContext();

const StateProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  const stateValue = {
    ...authState
  };

  const dispatchValue = {
    authDispatch
  };

  return (
    <DispatchContext.Provider value={dispatchValue}>
      <StateContext.Provider value={stateValue}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { StateContext, DispatchContext, StateProvider };
