import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const BannerList = () => {
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Banner List</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">Banner List</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Banner List</h4>
                </Col>
                <Col sm={12} md={6}>
                  <NavLink
                    className={"btn btn-primary float-end"}
                    to="/admin/banner/create"
                  >
                    <FaPlus /> Add Banner
                  </NavLink>
                </Col>
              </Row>
            </Container>
          </div>
          {/* <div className="card-body">
            <FaPlus /> Add Banner
          </div> */}
        </div>
      </div>
    </>
  );
};
