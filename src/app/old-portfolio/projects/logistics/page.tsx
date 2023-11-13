"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { PERSONAL_PROJECT_PUBLIC } from "@/configs/route";

export default function Logistics() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Logistics Website</h1>
          <Button href="https://vi-try-django-logistics.herokuapp.com/">
            Visit Logistics Website!
          </Button>
          <p style={{ color: "gray" }}>
            {" "}
            *Website might load slowly due to Heroku free plan
          </p>
        </Col>
      </Row>
      <Row className="project-desc">
        <Col style={{ minWidth: "15rem", maxWidth: "30rem" }}>
          <Card>
            <Carousel>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Logistics logo"
                  src={`${PERSONAL_PROJECT_PUBLIC}/logistics-logo.png`}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Logistics carousel 1"
                  src={`${PERSONAL_PROJECT_PUBLIC}/logistics-carousel_1.png`}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Logistics carousel 2"
                  src={`${PERSONAL_PROJECT_PUBLIC}/logistics-carousel_2.png`}
                />
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>
        <Col style={{ minWidth: "11rem" }}>
          <h2>Description</h2>
          <hr />
          <p>
            In a corporate or an organization setting, there are a lot of common
            items that might not be used as often. When one department is not
            using it, other department should be able to borrow it. This web
            application facilitate the lending and borrowing process. More
            details can be found in the Demo-ppt link below.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Technical Skills Learnt</h2>
          <Button href="https://github.com/viriyadhika/logistics-website">
            GitHub
          </Button>
          <hr />
          <ul>
            <li>
              Built using{" "}
              <a className="hyperlink" href="https://docs.djangoproject.com/">
                Django
              </a>{" "}
              backend with a Model-View-Template (MVT) architecture
            </li>
            <li>
              Django features used: authentication, generic forms, views and
              queries
            </li>
            <li>
              Front-end is done via HTML and CSS using by{" "}
              <a className="hyperlink" href="https://getbootstrap.com/">
                Bootstrap
              </a>{" "}
              framework
            </li>
            <li>
              Deployed via{" "}
              <a className="hyperlink" href="https://www.heroku.com/">
                Heroku platform
              </a>
            </li>
            <li>
              External libraries integration such as{" "}
              <a
                className="hyperlink"
                href="https://tempusdominus.github.io/bootstrap-4/"
              >
                Tempus-Dominus
              </a>{" "}
              for date-picker in Django
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Using Logistics Website</h2>
          <hr />
          <object
            data={`${PERSONAL_PROJECT_PUBLIC}/logistics-manual.pdf`}
            type="application/pdf"
            width="90%"
            height="500rem"
          >
            This browser does not support PDF. You can download the PDF to view
            it.
          </object>
          <p>
            In case the PDF above does{"'"}t show, you can access the slides{" "}
            <a href="https://drive.google.com/file/d/1pNcetOwBlItZRdHLqvJV1c9dIUcw5U7e/view?usp=sharing">
              here
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
