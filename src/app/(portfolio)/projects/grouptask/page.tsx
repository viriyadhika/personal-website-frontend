"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { PORTFOLIO_PUBLIC } from "../../constants";

export default function Grouptask() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Group Management Website</h1>
          <Button
            href="https://grouptask.viriyadhika.com"
            style={{ display: "inline" }}
          >
            View Website
          </Button>
        </Col>
      </Row>
      <Row className="project-desc">
        <Col style={{ minWidth: "11rem" }}>
          <h2>Description</h2>
          <hr />
          <p>
            This application is used to track tasks needed to be done by a
            group. It consists of Django REST API, Front-end React application
            and an Android application.
          </p>
        </Col>
        <Col style={{ minWidth: "15rem", maxWidth: "30rem" }}>
          <Card>
            <Carousel>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Grouptask logo"
                  src={`${PORTFOLIO_PUBLIC}/grouptask-logo.png`}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  fluid
                  alt="Grouptask carousel 1"
                  src={`${PORTFOLIO_PUBLIC}/grouptask-ss.png`}
                />
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Back-End Application</h2>
          <Button
            href="https://grouptaskapi.viriyadhika.com"
            style={{ display: "inline" }}
          >
            API Endpoint
          </Button>
          <Button
            href="https://github.com/viriyadhika/group-task-backend"
            style={{ display: "inline", marginLeft: "1rem" }}
          >
            GitHub
          </Button>
          <hr />
          <ul>
            <li>
              Implemented REST API using{" "}
              <a href="https://www.django-rest-framework.org/">
                {" "}
                Django REST Framework
              </a>
              . Learnt best practices of REST API endpoint for each resources.
              Returning data in form of JSON
            </li>
            <li>
              Created a detailed documentation on the API usage. This allows
              front-end applications to be built faster
            </li>
            <li>
              Utilizes{" "}
              <a href="https://django-rest-framework-simplejwt.readthedocs.io/en/latest/">
                JWT authentication
              </a>{" "}
              to secure the API
            </li>
            <li>Configured custom permission for different resources</li>
            <li>
              Configured <a href="https://www.postgresql.org/">PostgreSQL</a>{" "}
              for database
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Front-End Application</h2>
          <Button
            href="https://grouptask.viriyadhika.com"
            style={{ display: "inline" }}
          >
            View Website
          </Button>
          <Button
            href="https://github.com/viriyadhika/group-task-frontend"
            style={{ display: "inline", marginLeft: "1rem" }}
          >
            GitHub
          </Button>
          <hr />
          <ul>
            <li>
              Uses <a href="https://reactjs.org/">React JS</a> to build the
              project, including the use of{" "}
              <a href="https://create-react-app.dev/docs/getting-started/">
                {" "}
                create-react-app
              </a>{" "}
              to start the project
            </li>
            <li>
              Asynchronous fetching to via{" "}
              <a href="https://www.npmjs.com/package/axios"> axios</a> library
            </li>
            <li>
              Utilizes{" "}
              <a href="https://react-bootstrap.github.io/"> React-Bootstrap</a>{" "}
              library to create responsive website for different screen sizes
            </li>
            <li>
              <a href="https://reactjs.org/docs/hooks-intro.html">
                {" "}
                React Hooks
              </a>{" "}
              to maintain states in functional components
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Websites Deployment</h2>
          <Button
            href="https://github.com/viriyadhika/GroupTaskAndroid"
            style={{ display: "inline" }}
          >
            GitHub
          </Button>
          <hr />
          <ul>
            <li>
              Using <a href="https://www.nginx.com/">NGINX</a> webserver for
              handling proxy pass
            </li>
            <li>
              Utilized <a href="https://www.docker.com/">Docker</a> container
              and <a href="https://docs.docker.com/compose/">docker-compose</a>{" "}
              to ease deployment
            </li>
            <li>
              <a href="https://www.digitalocean.com/products/droplets/">
                Digital Ocean Droplet
              </a>{" "}
              as the server. Learnt about SSH for deployment purpose.
            </li>
            <li>Purchased and configured the DNS of the website.</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Android App</h2>
          <Button
            href="https://github.com/viriyadhika/GroupTaskAndroid"
            style={{ display: "inline" }}
          >
            GitHub
          </Button>
          <hr />
          <ul>
            <li>
              Utilizes{" "}
              <a href="https://developer.android.com/studio">Android Studio</a>{" "}
              to build the project
            </li>
            <li>
              Learnt{" "}
              <a href="https://developer.android.com/jetpack/guide">
                Model-View-ViewModel (MVVM)
              </a>{" "}
              design pattern for better separation of concern with Repositories
              fetching data from API and communicating to the View layer through
              Android LiveData
            </li>
            <li>
              <a href="https://developer.android.com/training/volley">
                Android Volley
              </a>{" "}
              to execute API calls and handling API exceptions
            </li>
            <li>
              Utilized built in Android components such as Toolbar and
              BottomNavigationBar for navigating different fragments of the app
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="project-desc">
          <h2>Using Group Management Website</h2>
          <hr />
          <object
            data={`${PORTFOLIO_PUBLIC}/grouptask-guide.pdf`}
            type="application/pdf"
            width="90%"
            height="500rem"
          >
            This browser does not support PDF. You can download the PDF to view
            it.
          </object>
          <p>
            In case the PDF above doesn{"'"}t show, you can access the slides{" "}
            <a href="https://drive.google.com/file/d/1Fgdnu1km30_Y4695gUJMDKLUjUZ7Up3s/view?usp=sharing">
              here
            </a>{" "}
          </p>
          <div className="iframe-container">
            <iframe
              width="560"
              height="315"
              style={{ maxWidth: "90%", alignSelf: "center" }}
              src="https://www.youtube.com/embed/WDhG5Z4j-KM"
              frameBorder="0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
