import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const NotFound = () => {
  return (
    <>
      <Container className="my-5 bg-light nav-margin">
        <Row>
          <Col>
            <p className="text-danger text-center">
              Oops!!! The resource you are looking for does not exists!!!
            </p>
            <p className=" text-center ">
              <a className="btn btn-link link-primary" href="/">
                Go to Home page
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
