"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import {
  PERSONAL_PROJECT_PUBLIC,
  PORTFOLIO_PUBLIC,
  SKILLS_PUBLIC,
} from "@/configs/route";
import { PROJECT_SUFFIX } from "./constants";

export default function Home() {
  return (
    <div className="home">
      <Hello />
      <Projects />
      <SkillSets />
    </div>
  );
}

function Hello() {
  return (
    <Container className="hello" fluid>
      <Row>
        <Col>
          <h1>I am Viriyadhika Putra</h1>
        </Col>
      </Row>
      <Row className="py-3 align-items-center justify-content-center">
        <Col style={{ maxWidth: "50rem" }}>
          <Row className="justify-content-center">
            <Col
              className="justify-content-center"
              style={{ maxWidth: "10rem" }}
              sm={3}
              md={2}
            >
              <Image
                fluid
                roundedCircle
                src={`${PORTFOLIO_PUBLIC}/self-pic.png`}
              />
            </Col>
            <Col
              sm={9}
              md={10}
              className="align-items-center justify-content-center"
            >
              <p style={{ textAlign: "start", wordWrap: "break-word" }}>
                Welcome to my website. This website is a showcase of some of my
                works that I am really proud of. For reference, you can take a
                look at my{" "}
                <a
                  className="hyperlink"
                  href="https://drive.google.com/file/d/1jr7o0zzgQmKshv8M5F5oirxeQ0GrPKWc/view?usp=sharing"
                >
                  Resume
                </a>
                , my
                <a
                  className="hyperlink"
                  href="https://sg.linkedin.com/in/viriyadhika-putra"
                >
                  {" "}
                  LinkedIn
                </a>{" "}
                profile, and my
                <a className="hyperlink" href="https://github.com/viriyadhika">
                  {" "}
                  GitHub
                </a>{" "}
                account. Also, feel free to contact me at
                viriya.dhika0@gmail.com!
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function Projects() {
  return (
    <Container className="projects" fluid>
      <Row
        className="py-4"
        style={{ backgroundColor: "#002348", color: "white" }}
      >
        <Col>
          <Row>
            <Col>
              <h1>Projects</h1>
            </Col>
          </Row>
          <Row className="justify-content-center mx-3">
            <Col style={{ maxWidth: "60rem" }}>
              <div className="project-grid">
                <div style={{ maxWidth: "25rem" }}>
                  <ProjectCard
                    title="Habit Tracker"
                    pic={"/habit_tracker-logo.png"}
                    subtitle="Java, Android Studio"
                    link={`${PROJECT_SUFFIX}/habit-tracker`}
                  />
                </div>
                <div style={{ maxWidth: "25rem" }}>
                  <ProjectCard
                    title="Logistics Website"
                    pic={"/logistics-logo.png"}
                    subtitle="Django, Python, Bootstrap"
                    link={`${PROJECT_SUFFIX}/logistics`}
                  />
                </div>
                <div style={{ maxWidth: "25rem" }}>
                  <ProjectCard
                    title="Group Management"
                    pic={"/grouptask-logo.png"}
                    subtitle="Django REST, Android, React JS"
                    link={`${PROJECT_SUFFIX}/grouptask`}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function ProjectCard(props: {
  pic: string;
  title: string;
  subtitle: string;
  link: string;
}) {
  return (
    <div>
      <Card className="project-card">
        {/* <Image fluid className="project-card-img" src={props.pic} /> */}
        <Image
          src={`${PERSONAL_PROJECT_PUBLIC}${props.pic}`}
          className="project-card-img"
          alt={`Project card ${props.title}`}
          fluid
        />
        <Row className="project-card-desc justify-content-center align-items-center">
          <Col>
            <Row className="card-title align-content-center">
              <Col>
                <h2 className="card-title-text">{props.title}</h2>
              </Col>
            </Row>
            <Row className="card-subtitle align-content-center pb-3">
              <Col>
                <p>{props.subtitle}</p>
              </Col>
            </Row>
            <Row className="align-content-center">
              <Col>
                <Button href={props.link}>Learn More</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

function SkillSets() {
  let front_end = [
    ["Android Studio", "/android_studio.png"],
    ["ReactJS", "/react.png"],
    ["Bootstrap", "/bootstrap.png"],
  ];

  let back_end = [
    ["Django", "/django.png"],
    ["Django REST Framework", "/drf.png"],
  ];

  let devops = [
    ["Docker", "/docker.png"],
    ["NGINX", "/nginx.png"],
  ];

  let languages = [
    ["Python", "/python.png"],
    ["Java", "/java.png"],
    ["TypeScript", "/typescript.png"],
    ["HTML", "/html.png"],
  ];

  return (
    <Container
      style={{ maxWidth: "60rem", marginTop: "3rem", marginBottom: "5rem" }}
    >
      <Row className="justify-content-center">
        <Col>
          <h1>Skillsets</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <h2>Programming Languages</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {languages.map((lang) => {
          return (
            <Col key={lang[0]} style={{ minWidth: "5rem" }}>
              <Row className="justify-content-center">
                <Image
                  fluid
                  src={`${SKILLS_PUBLIC}${lang[1]}`}
                  style={{ maxHeight: "5rem" }}
                />
              </Row>
              <Row className="justify-content-center">{lang[0]}</Row>
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <h2>Back-End</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {back_end.map((be) => {
          return (
            <Col key={be[0]} style={{ minWidth: "5rem" }}>
              <Row className="justify-content-center">
                <Image
                  fluid
                  src={`${SKILLS_PUBLIC}${be[1]}`}
                  style={{ maxHeight: "5rem" }}
                />
              </Row>
              <Row className="justify-content-center">{be[0]}</Row>
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <h2>Front-End</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {front_end.map((fe) => {
          return (
            <Col key={fe[0]} style={{ minWidth: "5rem" }}>
              <Row className="justify-content-center">
                <Image
                  fluid
                  src={`${SKILLS_PUBLIC}${fe[1]}`}
                  style={{ maxHeight: "5rem" }}
                />
              </Row>
              <Row className="justify-content-center">{fe[0]}</Row>
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <h2>Dev Ops</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {devops.map((dev) => {
          return (
            <Col key={dev[0]} style={{ minWidth: "5rem" }}>
              <Row className="justify-content-center">
                <Image
                  fluid
                  src={`${SKILLS_PUBLIC}${dev[1]}`}
                  style={{ maxHeight: "5rem" }}
                />
              </Row>
              <Row className="justify-content-center">{dev[0]}</Row>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
