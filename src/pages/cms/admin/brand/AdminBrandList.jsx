import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { brandServiceObj } from ".";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ImagePreview } from "../../../../components/image.preview";
import DataTable from "react-data-table-component";

export const AdminBrandList = () => {
  const [brandData, setBrandData] = useState();
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "Id",
      selector: (row) => row?._id,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Logo",
      selector: (row) => (
        <ImagePreview imageURL={row?.logo} imgFolder="brands" />
      ),
    },
    {
      name: "Status",
      selector: (row) => row?.status,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <NavLink to={`/admin/brand/${row?._id}`}>
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
          <NavLink to={`/admin/brand/${row?._id}`}>
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
          let response = await brandServiceObj.deleteBrand(id);
          toast.success(response.data?.msg);
          loadBrandData();
          setLoading(false);
        } catch (error) {
          toast.error("Something went wrong while deleting brand.");
        }
      }
    });
  };

  const loadBrandData = async () => {
    try {
      let response = await brandServiceObj.getAllAdminBrand(10, 1);
      // console.log(response);
      setBrandData(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(brandData);
  useEffect(() => {
    loadBrandData();
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
            <h1 className="mt-4">Brand List</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <NavLink to="/admin">Dashboard</NavLink>
              </li>
              <li className="breadcrumb-item active">Brand List</li>
            </ol>
            <div className="card mb-4">
              <div className="card-header">
                <Container>
                  <Row>
                    <Col sm={12} md={6}>
                      <h4>Brand List</h4>
                    </Col>
                    <Col sm={12} md={6}>
                      <NavLink
                        className={"btn btn-primary float-end"}
                        to="/admin/brand/create"
                      >
                        <FaPlus /> Add Brand
                      </NavLink>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="card-body">
                <DataTable
                  columns={columns}
                  data={brandData}
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
