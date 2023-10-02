import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { OrderServiceObj } from ".";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ImagePreview } from "../../../../components/image.preview";
import DataTable from "react-data-table-component";

export const AdminOrderList = () => {
  const [orderData, setOrderData] = useState();
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
    },
    {
      name: "Product",
      cell: (row) => (
        <div>
          {row.orderDetails.map((item) => (
            <div key={item.id}>
              <p className="fw-bold mt-2" style={{ marginBottom: "0" }}>
                Name:
              </p>
              <p> {item.id.name}</p>
              <p>
                <span className="fw-bold">Quantity:</span> {item.qty}
              </p>
              <p>
                <span className="fw-bold">Amount:</span> {item.amt}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Buyer",
      cell: (row) => (
        <div>
          <p className="fw-bold" style={{ marginBottom: "0" }}>
            Name:
          </p>
          <p> {row.buyer.name}</p>
          <p className="fw-bold" style={{ margin: "0" }}>
            Shipping Address:
          </p>
          <p> {row.buyer?.address?.shippingAddress}</p>
          <p className="fw-bold" style={{ margin: "0" }}>
            Billing Address:
          </p>
          <p> {row.buyer?.address?.billingAddress}</p>
        </div>
      ),
    },
    {
      name: "IsPaid",
      selector: (row) => (row.isPaid === true ? "Yes" : "Not"),
    },
    {
      name: "Total (Rs.)",
      selector: (row) => row?.totalAmt,
    },
    // {
    //   name: "Image",
    //   selector: (row) => (
    //     <ImagePreview imageURL={row?.image} imgFolder="category" />
    //   ),
    // },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <NavLink to={`/admin/orders/${row?._id}`}>
            <Button
              //   onClick={(e) => {
              //     e.preventDefault();
              //     handleDelete(row?._id);
              //   }}
              className="link-danger"
              variant=""
              size="sm"
            >
              <FaTrash />
            </Button>
          </NavLink>
          <NavLink to={`/admin/orders/${row?._id}`}>
            <Button variant="" className="link-success" size="sm">
              <FaEdit />
            </Button>
          </NavLink>
        </>
      ),
    },
  ];

  const loadOrderData = async () => {
    try {
      let response = await OrderServiceObj.getAllAdminOrder();
      // console.log(response);
      setOrderData(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="nav-margin">Loading...</div>
        </>
      ) : (
        <>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Order List</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <NavLink to="/admin">Dashboard</NavLink>
              </li>
              <li className="breadcrumb-item active">Order List</li>
            </ol>
            <div className="card mb-4">
              <div className="card-header">
                <Container>
                  <Row>
                    <Col sm={12} md={6}>
                      <h4>Order List</h4>
                    </Col>
                    <Col sm={12} md={6}>
                      {/* <NavLink
                        className={"btn btn-primary float-end"}
                        to="/admin/category/create"
                      >
                        <FaPlus /> Add Order
                      </NavLink> */}
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="card-body">
                <DataTable
                  columns={columns}
                  data={orderData}
                  highlightOnHover
                  pagination
                  fixedHeader
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
