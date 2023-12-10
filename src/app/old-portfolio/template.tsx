"use client";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./global.css";
import { PORTFOLIO_PUBLIC } from "@/configs/route";
import { PROJECT_SUFFIX } from "./constants";

export default function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar bg="transparent" expand="lg">
        <Navbar.Brand href="/">
          <Image
            fluid
            width="40rem"
            height="40rem"
            alt="Viriyadhika Logo"
            className="d-inline-block align-top"
            src={`${PORTFOLIO_PUBLIC}/VPlogo-final.png`}
          />{" "}
          Viriyadhika
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href={`${PROJECT_SUFFIX}/habit-tracker`}>
              Habit Tracker
            </Nav.Link>
            <Nav.Link href={`${PROJECT_SUFFIX}/logistics`}>Logistics</Nav.Link>
            <Nav.Link href={`${PROJECT_SUFFIX}/grouptask`}>
              Group Management
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </>
  );
}
