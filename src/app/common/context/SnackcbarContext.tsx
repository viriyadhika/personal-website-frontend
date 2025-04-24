import { Alert, Snackbar } from "@mui/material";
import React, { ReactNode, createContext, useCallback, useState } from "react";

export const SnackbarContext = createContext({
  onSnackBar: (messages: string) => {},
});

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbarMsg, setSnackbarMsg] = useState("");
  return (
    <SnackbarContext.Provider value={{ onSnackBar: setSnackbarMsg }}>
      <Snackbar
        open={Boolean(snackbarMsg)}
        autoHideDuration={5000}
        onClose={() => setSnackbarMsg("")}
        message={snackbarMsg}
      />
      {children}
    </SnackbarContext.Provider>
  );
}
