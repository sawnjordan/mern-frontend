import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { categoryServiceObj } from ".";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ImagePreview } from "../../../../components/image.preview";
import DataTable from "react-data-table-component";

export const AdminCategoryList = () => {
  const [categoryData, setCategoryData] = useState();
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Parent",
      selector: (row) => (row?.parent?.name ? row?.parent.name : "-"),
    },
    {
      name: "Image",
      selector: (row) => (
        <ImagePreview imageURL={row?.image} imgFolder="category" />
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <NavLink to={`/admin/category/${row?._id}`}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(row?._id);
              }}
              className="link-danger"
              variant=""
              size="sm"
            >
              <FaTrash />
            </Button>
          </NavLink>
          <NavLink to={`/admin/category/${row?._id}`}>
            <Button variant="" className="link-success" size="sm">
              <FaEdit />
            </Button>
          </NavLink>
        </>
      ),
    },
  ];

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
          let response = await categoryServiceObj.deleteCategory(id);
          toast.success(response.data?.msg);
          loadCategoryData();
          setLoading(false);
        } catch (error) {
          toast.error("Something went wrong while deleting category.");
        }
      }
    });
  };
  const loadCategoryData = async () => {
    try {
      let response = await categoryServiceObj.getAllAdminCategory(10, 1);
      // console.log(response);
      setCategoryData(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCategoryData();
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
            <h1 className="mt-4">Category List</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <NavLink to="/admin">Dashboard</NavLink>
              </li>
              <li className="breadcrumb-item active">Category List</li>
            </ol>
            <div className="card mb-4">
              <div className="card-header">
                <Container>
                  <Row>
                    <Col sm={12} md={6}>
                      <h4>Category List</h4>
                    </Col>
                    <Col sm={12} md={6}>
                      <NavLink
                        className={"btn btn-primary float-end"}
                        to="/admin/category/create"
                      >
                        <FaPlus /> Add Category
                      </NavLink>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="card-body">
                <DataTable
                  columns={columns}
                  data={categoryData}
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
