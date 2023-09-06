import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { brandServiceObj } from ".";
import { toast } from "react-toastify";

export const AdminUpdateBrand = () => {
  const [loading, setLoading] = useState(false);
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [brandDetails, setBrandDetails] = useState();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  let allowedExt = ["jpg", "png", "jpeg", "webp", "gif", "svg"];

  const brandSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    status: Yup.string()
      .matches(/active|inactive/, "Invalid value for status.")
      .default("inactive"),
    logo: Yup.mixed()
      .test(
        "fileSize",
        "The file size is too large. Max file size 3 MB",
        (value) => {
          if (value && value.length > 0) {
            return value[0].size <= 3000000;
          }
          return true;
        }
      )
      .test(
        "fileExtension",
        "Invalid file type. Please upload an logo.",
        (value) => {
          if (value && value.length > 0) {
            return allowedExt.includes(
              value[0].name.split(".").pop().toLowerCase()
            );
          }
          return true;
        }
      ),
  });
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(brandSchema),
  });
  const { errors } = formState;
  // console.log(errors);

  const handleUpdateBrand = async (data) => {
    if (data.logo.length === 0) {
      data.logo = brandDetails.logo;
    } else {
      data.logo = data.logo[0];
    }

    //API Integration

    try {
      setLoading(true);
      let response = await brandServiceObj.updateBrand(data, id);
      toast.success(response?.data?.msg);
      navigate("/admin/brand");
      //   console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const getBrandDetails = async () => {
    try {
      let response = await brandServiceObj.getBrandById(id);
      const brandData = response.data?.data;
      setBrandDetails(brandData);
      setValue("name", brandData?.name);
      setValue("link", brandData?.link);
      setValue("status", brandData?.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrandDetails();
  }, []);
  //   console.log(brandDetails);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Brand List</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="/admin/brand">Brand List</NavLink>
          </li>
          <li className="breadcrumb-item active">Update Brand</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Update Brand</h4>
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
            <div className="container mb-5">
              <div className="row">
                <div className="col-lg-8">
                  <form
                    className="form"
                    onSubmit={handleSubmit(handleUpdateBrand)}
                  >
                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Name:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is required.",
                          })}
                          className="form-control"
                          placeholder="Enter name"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.name?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="role" className="form-label fw-medium">
                          Status:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <select
                          className="form-select"
                          name="status"
                          {...register(
                            "status",
                            { value: "inactive" },
                            {
                              required: "Status is required.",
                            }
                          )}
                        >
                          <option value="active">Publish</option>
                          <option value="inactive">Un-Publish</option>
                        </select>
                        <div className="text-danger mt-2">
                          {errors && errors.status?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label
                          htmlFor="formFile"
                          className="form-label fw-medium"
                        >
                          Logo:
                        </label>
                      </div>

                      <div className="col-lg-7">
                        <input
                          className="form-control"
                          type="file"
                          {...register("logo")}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const logoUrl = URL.createObjectURL(file);
                              setNewLogoUrl(logoUrl);
                            } else {
                              setNewLogoUrl("");
                            }
                          }}
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.logo?.message}
                        </div>
                      </div>
                      <div className="col-lg-2">
                        {newLogoUrl ? (
                          <img
                            src={newLogoUrl}
                            className="img img-fluid shadow-lg"
                          />
                        ) : brandDetails && brandDetails.logo ? (
                          <img
                            src={`${import.meta.env.VITE_IMAGE_URL}/brands/${
                              brandDetails.logo
                            }`}
                            className="img img-fluid shadow-lg"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
                        <button className="btn btn-primary" disabled={loading}>
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
