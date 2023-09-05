import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { bannerServiceObj } from ".";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const AdminBannerList = () => {
  const [bannerData, setBannerData] = useState();
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          let response = await bannerServiceObj.deleteBanner(id);
          toast.success(response.data?.msg);
          loadBannerData();
          setLoading(false);
        } catch (error) {
          toast.error("Something went wrong while deleting banner.");
        }
      }
    });
  };
  const loadBannerData = async () => {
    try {
      let response = await bannerServiceObj.getAllAdminBanner(10, 1);
      console.log(response);
      setBannerData(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  bannerData &&
                  bannerData.map((data, index) => (
                    <tr key={index}>
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
                        <NavLink to={`/admin/baner/${data?._id}`}>
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
                        <NavLink to={`/admin/banner/${data?._id}`}>
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
