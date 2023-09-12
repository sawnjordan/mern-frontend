import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ImagePreview } from "../../../../components/image.preview";

export const AdminProductList = () => {
  const { loading, setLoading } = useState();
  const [productList, setProductList] = useState();
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Product List</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">Product List</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Product List</h4>
                </Col>
                <Col sm={12} md={6}>
                  <NavLink
                    className={"btn btn-primary float-end"}
                    to="/admin/product/create"
                  >
                    <FaPlus /> Add Product
                  </NavLink>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="card-body">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Brand</th>
                  {/* <th>Image</th> */}
                  <th>Seller</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  productList &&
                  productList.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.name}</td>
                      <td>{data?.description}</td>
                      <td>{data?.categories}</td>
                      <td>{data?.price}</td>
                      <td>{data?.brand}</td>
                      <td>{data?.sellerId}</td>
                      {/* <td>{data?.image}</td> */}
                      {/* <td>
                        <ImagePreview
                          imageURL={data?.image}
                          imgFolder="product"
                        />
                      </td> */}
                      <td>{data?.status}</td>
                      <td>
                        {/* <Button variant="danger me-4" size="sm">
                          <FaTrash className="" />
                        </Button>
                        <Button variant="success" size="sm">
                          <FaEdit size={12} />
                        </Button> */}
                        <NavLink to={`/admin/product/${data?._id}`}>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(data?._id);
                            }}
                            className="link-danger"
                            variant=""
                            size="sm"
                          >
                            <FaTrash />
                          </Button>
                        </NavLink>
                        <NavLink to={`/admin/product/${data?._id}`}>
                          <Button variant="" className="link-success" size="sm">
                            <FaEdit />
                          </Button>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
