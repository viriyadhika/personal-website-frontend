"use client";

import { Box, ThemeProvider } from "@mui/material";
import Home from "./containers/home";
import NavBar from "./containers/home/nav-bar";
import Experiences from "./containers/experiences";
import { lazy } from "react";
import theme from "./theme";
import Education from "./containers/education";
import useScroll from "./hooks/use-scroll";

const Skills = lazy(() => import("./containers/skills"));

export default function Page() {
  const { scrollTo, experienceRef, skillsRef, educationRef } = useScroll();

  return (
    <ThemeProvider theme={theme}>
      <Box pb={2}>
        <Home />
        <NavBar onClick={scrollTo} />
        <Experiences ref={experienceRef} />
        <Education ref={educationRef} />
        <Skills ref={skillsRef} />
      </Box>
    </ThemeProvider>
  );
}
