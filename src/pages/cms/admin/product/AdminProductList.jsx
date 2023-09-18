import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ImagePreview } from "../../../../components/image.preview";
import { toast } from "react-toastify";
import { productServiceObj } from ".";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

export const AdminProductList = () => {
  const [loading, setLoading] = useState();
  const [productList, setProductList] = useState();

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Category",
      selector: (row) => row?.categories.map((item) => item.name).join(", "),
    },
    {
      name: "Price",
      selector: (row) => row.price.toLocaleString(),
    },
    {
      name: "Brand",
      selector: (row) => row.brand.name,
    },
    {
      name: "Seller",
      selector: (row) => row.sellerId.name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <NavLink to={`/admin/product/${row?._id}`}>
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
          <NavLink to={`/admin/product/${row?._id}`}>
            <Button variant="" className="link-success" size="sm">
              <FaEdit />
            </Button>
          </NavLink>
        </>
      ),
    },
  ];

  const getAllProducts = async () => {
    try {
      let response = await productServiceObj.getAllAdminProduct();
      // console.log(response.data.data);
      setProductList(response.data.data);
    } catch (error) {
      toast.warn("Error while fetching product.");
    }
  };
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
          console.log("first");
          let response = await productServiceObj.deleteProduct(id);
          toast.success(response.data?.msg);
          getAllProducts();
          setLoading(false);
        } catch (error) {
          toast.error("Something went wrong while deleting category.");
        }
      }
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
            <DataTable
              columns={columns}
              data={productList}
              highlightOnHover
              pagination
              fixedHeader
            />
          </div>
        </div>
      </div>
    </>
  );
};
