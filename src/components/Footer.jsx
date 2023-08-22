import React from "react";
import { Col, Container, ListGroup, Navbar, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <>
      <Navbar as="footer" id="footer">
        <Container>
          <Row>
            <Col sm={12} md={4}>
              <a
                href="/template/index.html"
                className="navbar-brand d-flex align-items-center pt-3"
              >
                <img
                  src="../../src/assets/images/shopping-bag-icon.png"
                  alt="Site Logo"
                  srcSet=""
                />
                <span className="text-uppercase fw-lighter text-white">
                  eCommerce
                </span>
              </a>
              <p className="pt-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
                expedita, est libero recusandae quidem nisi fugiat quos
                cupiditate perferendis omnis ea? Nemo perspiciatis sed
                repudiandae eum voluptate, dolore voluptatum blanditiis. Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Iste
                expedita. repudiandae eum voluptate, dolore voluptatum
                blanditiis.
              </p>
            </Col>
            <Col sm={12} md={4} className="mt-3">
              <h4>Quick Links</h4>
              <p className="border-1 border-bottom border-primary"></p>
              <ListGroup>
                <ListGroup.Item action href="/">
                  About Us
                </ListGroup.Item>
                <ListGroup.Item action href="/">
                  Terms and Conditions
                </ListGroup.Item>
                <ListGroup.Item action href="/">
                  Privacy Policy
                </ListGroup.Item>
                <ListGroup.Item action href="/">
                  Register
                </ListGroup.Item>
                <ListGroup.Item action href="/">
                  Login
                </ListGroup.Item>
                <ListGroup.Item action href="/">
                  Contact Us
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12} md={4} className="mt-3">
              <h4>Connect with Us</h4>
              <p className="border-1 border-bottom border-primary"></p>
              <div className="bg-white text-dark p-3 rounded-3">
                <h5 className="mb-3 text-center">Newsletter</h5>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your email"
                    aria-label="Your email"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              <div className="ratio ratio-1x1 mt-4 ">
                <iframe
                  className="rounded-2"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8341770733036!2d85.33946831118885!3d27.691519576092354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb193cf5e3fbb3%3A0x233e3b37881d1180!2sE-Commerce!5e0!3m2!1sen!2snp!4v1691668976804!5m2!1sen!2snp"
                  width="300"
                  height="400"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};
