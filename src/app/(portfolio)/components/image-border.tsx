import { Box, Card } from "@mui/material";
import { ReactNode } from "react";

export default function ImageBorder({
  children,
  size,
}: {
  children: ReactNode;
  size: string | number;
}) {
  return (
    <Card
      sx={{
        height: size,
        width: size,
        minWidth: size,
        minHeight: size,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Card>
  );
}
