"use client";

import React, { createContext, useContext, ReactNode } from "react";
import InitialAlert from "~/components/custom/InitialAlert";
import { useInitialAlertClicked } from "~/hooks/useInitialAlertClicked";

interface InitialAlertContextType {
  isClicked: boolean;
  shouldShowAlert: boolean;
  markAsClicked: () => void;
}

const InitialAlertContext = createContext<InitialAlertContextType | undefined>(
  undefined
);

interface InitialAlertProviderProps {
  children: ReactNode;
}

export function InitialAlertProvider({ children }: InitialAlertProviderProps) {
  const { isClicked, shouldShowAlert, markAsClicked } = useInitialAlertClicked();

  return (
    <InitialAlertContext.Provider value={{ isClicked, shouldShowAlert, markAsClicked }}>
      <InitialAlert />
      {children}
    </InitialAlertContext.Provider>
  );
}

export function useInitialAlert() {
  const context = useContext(InitialAlertContext);
  if (context === undefined) {
    throw new Error(
      "useInitialAlert must be used within an InitialAlertProvider"
    );
  }
  return context;
}
