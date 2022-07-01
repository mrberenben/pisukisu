import React from "react";

// ts types
import { AppContextType, AppDispatchContextType } from "types/app";

// actions
import { AppActions } from "context/AppActions";

const AppState = {
  activeSerie: null
};

const AppContext = React.createContext<AppContextType>(AppState);
const AppDispatchContext = React.createContext<AppDispatchContextType<any, any> | undefined>(
  undefined
);

const AppReducer = (state: any, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case AppActions.GET_ACTIVE_SERIE: {
      return AppState.activeSerie;
    }

    case AppActions.SET_ACTIVE_SERIE: {
      return {
        ...AppState,
        activeSerie: payload
      };
    }

    default:
      return state;
  }
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(AppReducer, AppState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

const useAppState = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }

  return context;
};

const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }

  return context;
};

export { AppProvider, useAppState, useAppDispatch };
