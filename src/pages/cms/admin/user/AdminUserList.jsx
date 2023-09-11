import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { userServiceObj } from ".";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ImagePreview } from "../../../../components/image.preview";

export const AdminUserList = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    Swal.fire({
      name: "Are you sure?",
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
          let response = await userServiceObj.deleteUser(id);
          toast.success(response.data?.msg);
          loadUserData();
          setLoading(false);
        } catch (error) {
          toast.error("Something went wrong while deleting user.");
        }
      }
    });
  };
  const loadUserData = async () => {
    try {
      let response = await userServiceObj.getAllAdminUser(100, 1);
      // console.log(response);
      setUserData(response?.data?.data);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">User List</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">User List</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>User List</h4>
                </Col>
                <Col sm={12} md={6}>
                  <NavLink
                    className={"btn btn-primary float-end"}
                    to="/admin/user/create"
                  >
                    <FaPlus /> Add User
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
                  <th>Email</th>
                  <th>Role</th>
                  <th>Avatar</th>
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
                  userData &&
                  userData.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.name}</td>
                      <td>{data?.email}</td>
                      <td>{data?.role}</td>
                      {/* <td>{data?.logo}</td> */}
                      <td>
                        <ImagePreview
                          imageURL={data?.image}
                          imgFolder="users"
                        />
                      </td>
                      <td>{data?.status}</td>
                      <td>
                        {/* <Button variant="danger me-4" size="sm">
                      <FaTrash className="" />
                    </Button>
                    <Button variant="success" size="sm">
                      <FaEdit size={12} />
                    </Button> */}
                        {data?.role !== "admin" ? (
                          <>
                            <NavLink to={`/admin/user/${data?._id}`}>
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
                            <NavLink to={`/admin/user/${data?._id}`}>
                              <Button
                                variant=""
                                className="link-success"
                                size="sm"
                              >
                                <FaEdit />
                              </Button>
                            </NavLink>
                          </>
                        ) : (
                          <></>
                        )}
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
