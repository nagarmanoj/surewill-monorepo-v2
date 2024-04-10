"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AppContextValueInterface {
  menuDrawer: boolean;
}

interface AppContextActionInterface {
  setMenuDrawer: (active: boolean) => void;
}

interface AppContextInterface extends AppContextValueInterface {
  actions: AppContextActionInterface;
}

export const AppContext = createContext<AppContextInterface>({
  menuDrawer: false,
  actions: {
    setMenuDrawer: () => {},
  },
});

interface AppContextProviderInterface {
  children: ReactNode;
}

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({
  children,
}: AppContextProviderInterface) => {
  const [state, setState] = useState<AppContextValueInterface>({
    menuDrawer: false,
  });

  const setMenuDrawer = (active: boolean) => {
    setState((value) => ({
      ...value,
      menuDrawer: active,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        actions: {
          setMenuDrawer,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
