"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { PERSONAL_PROJECT_PUBLIC } from "@/configs/route";

export default function HabitTracker() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Habit Tracker</h1>
        </Col>
      </Row>
      <Row className="justify-content-center project-desc">
        <Col style={{ minWidth: "11rem" }}>
          <h2>Description</h2>
          <hr />
          <p>
            One of the practices that I do to boost my productivity in order to
            reach my goal is doing up a
            <a
              className="hyperlink"
              href="https://en.wikipedia.org/wiki/Bullet_Journal"
            >
              {" "}
              Bullet Journal
            </a>
            . Inspired by this practice, I designed an app to help me streamline
            my daily bullet journaling. Habit Tracker is an app designed for
            tracking a habit, adding a daily record and generating statistics,
            all within a few clicks.
          </p>
        </Col>
        <Col style={{ minWidth: "15rem", maxWidth: "30rem" }}>
          <Card>
            <Carousel>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Habit Tracker Logo"
                  src={`${PERSONAL_PROJECT_PUBLIC}/habit_tracker-logo.png`}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Habit Tracker Add Habit"
                  src={`${PERSONAL_PROJECT_PUBLIC}/habit_tracker-add_habit.png`}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Habit Tracker Add Record"
                  src={`${PERSONAL_PROJECT_PUBLIC}/habit_tracker-add_record.png`}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Habit Tracker View Statistics"
                  src={`${PERSONAL_PROJECT_PUBLIC}/habit_tracker-view_statistics.png`}
                />
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Technical Skills Learnt</h2>
          <Button href="https://github.com/viriyadhika/GoalTracker">
            GitHub
          </Button>
          <hr />
          <ul>
            <li>
              Using <strong>Android Studio</strong> platform to build
            </li>
            <li>
              Built-using Model-View-ViewModel (MVVM){" "}
              <a
                className="hyperlink"
                href="https://developer.android.com/jetpack/guide"
              >
                architecture
              </a>
            </li>
            <li>
              Utilize SQLite Database via{" "}
              <a
                className="hyperlink"
                href="https://developer.android.com/training/data-storage/room"
              >
                Android Room
              </a>{" "}
              back-end
            </li>
            <li>
              Front-end is achieved through and Android built-in ViewModel and
              rendering of XML
            </li>
            <li>
              External library{" "}
              <a
                className="hyperlink"
                href="https://github.com/PhilJay/MPAndroidChart"
              >
                (MPAndroidChart)
              </a>{" "}
              for displaying statistics
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Using Habit Tracker</h2>
          <hr />
          <div className="iframe-container">
            <iframe
              width="560"
              height="315"
              style={{ maxWidth: "100%", alignSelf: "center" }}
              src="https://www.youtube.com/embed/75QTN7J4Ec4"
              frameBorder="0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
