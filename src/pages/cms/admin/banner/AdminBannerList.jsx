import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { bannerServiceObj } from ".";

export const AdminBannerList = () => {
  const [bannerData, setBannerData] = useState();
  const loadBannerData = async () => {
    try {
      let response = await bannerServiceObj.getAllAdminBanner(10, 1);
      console.log(response);
      setBannerData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadBannerData();
  }, []);
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
          <div className="card-body">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bannerData &&
                  bannerData.map((data, index) => (
                    <tr>
                      <td>{data?._id}</td>
                      <td>{data?.title}</td>
                      <td>{data?.image}</td>
                      <td>{data?.status}</td>
                      <td>
                        {/* <Button variant="danger me-4" size="sm">
                      <FaTrash className="" />
                    </Button>
                    <Button variant="success" size="sm">
                      <FaEdit size={12} />
                    </Button> */}
                        <Button className="link-danger" variant="" size="sm">
                          <FaTrash />
                        </Button>
                        <Button variant="" className="link-success" size="sm">
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
