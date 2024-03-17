import { Alert, Snackbar } from "@mui/material";
import { AppProps } from "next/app";
import React, { ReactNode, createContext, useCallback, useState } from "react";

export enum APIStatus {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

export const APIContext = createContext({
  isAPIRunning: false,
  onLoadAPI: () => {},
  onErrorAPI: (msg: string) => {},
  onAPIReset: () => {},
});

export function APIHandlerProvider({ children }: { children: ReactNode }) {
  const [apiStatus, setApiStatus] = useState(APIStatus.INITIAL);
  const [errorMessage, setErrorMessage] = useState("");
  const onLoadAPI = useCallback(() => {
    setApiStatus(APIStatus.LOADING);
  }, []);
  const onErrorAPI = useCallback((msg: string) => {
    setApiStatus(APIStatus.ERROR);
    setErrorMessage(msg);
  }, []);
  const onAPIReset = useCallback(() => {
    setErrorMessage("");
    setApiStatus(APIStatus.INITIAL);
  }, []);
  return (
    <APIContext.Provider
      value={{
        isAPIRunning: apiStatus === APIStatus.LOADING,
        onLoadAPI,
        onErrorAPI,
        onAPIReset,
      }}
    >
      {children}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={3000}
        onClose={onAPIReset}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </APIContext.Provider>
  );
}
