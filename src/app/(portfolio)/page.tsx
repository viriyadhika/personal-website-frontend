"use client";

import { Box, ThemeProvider } from "@mui/material";
import Home from "./containers/home";
import NavBar from "./containers/home/nav-bar";
import Experiences from "./containers/experiences";
import Projects from "./containers/projects";
import Skills from "./containers/skills";
import theme from "./theme";

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <Box pb={2}>
        <Home />
        <NavBar />
        <Experiences />
        <Projects />
        <Skills />
      </Box>
    </ThemeProvider>
  );
}
