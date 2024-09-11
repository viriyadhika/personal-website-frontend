import { Alert, Snackbar } from "@mui/material";
import React, { ReactNode, createContext, useCallback, useState } from "react";

export const APIContext = createContext({
  onErrorAPI: (msg: string) => {},
  onAPIReset: () => {},
});

export function APIHandlerProvider({ children }: { children: ReactNode }) {
  const [errorMessage, setErrorMessage] = useState("");
  const onErrorAPI = useCallback((msg: string) => {
    setErrorMessage(msg);
  }, []);
  const onAPIReset = useCallback(() => {
    setErrorMessage("");
  }, []);
  return (
    <APIContext.Provider
      value={{
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
