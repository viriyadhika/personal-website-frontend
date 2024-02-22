import { Alert, Snackbar } from "@mui/material";
import { AppProps } from "next/app";
import { createContext, useState } from "react";

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

export function withAPIHandler(Component: React.FunctionComponent<AppProps>) {
  const WrappedWithAPIHandler = (props: AppProps) => {
    const [apiStatus, setApiStatus] = useState(APIStatus.INITIAL);
    const [errorMessage, setErrorMessage] = useState("");
    const onLoadAPI = () => {
      setApiStatus(APIStatus.LOADING);
    };
    const onErrorAPI = (msg: string) => {
      setApiStatus(APIStatus.ERROR);
      setErrorMessage(msg);
    };
    const onAPIReset = () => {
      setErrorMessage("");
      setApiStatus(APIStatus.INITIAL);
    };
    return (
      <APIContext.Provider
        value={{
          isAPIRunning: apiStatus === APIStatus.LOADING,
          onLoadAPI,
          onErrorAPI,
          onAPIReset,
        }}
      >
        <Component {...props} />
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={3000}
          onClose={onAPIReset}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      </APIContext.Provider>
    );
  };

  return WrappedWithAPIHandler;
}
