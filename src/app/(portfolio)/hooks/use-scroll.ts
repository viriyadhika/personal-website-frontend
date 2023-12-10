import { RefObject, useRef } from "react";
import { Section } from "../constants";

const NAVBAR_HEIGHT = 64;

export default function useScroll() {
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const sectionToRefMap: Record<Section, RefObject<HTMLElement>> = {
    [Section.education]: educationRef,
    [Section.experiences]: experienceRef,
    [Section.projects]: experienceRef,
    [Section.skills]: skillsRef,
  };

  function scrollTo(section: Section) {
    const ref = sectionToRefMap[section];
    window.scrollTo({
      behavior: "smooth",
      top: (ref.current?.offsetTop || 0) - NAVBAR_HEIGHT,
    });
  }

  return {
    skillsRef,
    experienceRef,
    educationRef,
    scrollTo,
  };
}
