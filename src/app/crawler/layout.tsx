import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "Crawler app",
  description: "Crawling LinkedIn for a customized view",
};

const buttons = [
  {
    title: "Admin Panel",
    link: "/crawler/admin",
  },
  {
    title: "All batches",
    link: "/crawler/batches",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppBar position="static">
          <Toolbar>
            <Stack ml={"auto"} direction={"row"} spacing={2}>
              {buttons.map(({ title, link }) => {
                return (
                  <Button key={link} color="inherit">
                    <Link style={{ color: "inherit" }} href={link}>
                      {title}
                    </Link>
                  </Button>
                );
              })}
            </Stack>
          </Toolbar>
        </AppBar>
        <Box padding={2}>{children}</Box>
      </body>
    </html>
  );
}
