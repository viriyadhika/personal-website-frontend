"use client";

import { Box, ThemeProvider } from "@mui/material";
import Home from "./containers/home";
import NavBar from "./containers/home/nav-bar";
import Experiences from "./containers/experiences";
import { lazy } from "react";
import theme from "./theme";
import Education from "./containers/education";

const Skills = lazy(() => import("./containers/skills"));
const Projects = lazy(() => import("./containers/projects"));

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <Box pb={2}>
        <Home />
        <NavBar />
        <Experiences />
        <Education />
        <Projects />
        <Skills />
      </Box>
    </ThemeProvider>
  );
}
