import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import AuthServiceObj from "../../../home/auth/auth.service";

export const AdminCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const navigate = useNavigate();
  let allowedExt = ["jpg", "png", "jpeg", "webp", "gif", "svg"];
  const registerSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email().required("Email is required."),
    phone: Yup.string().required("Phone is required."),
    address: Yup.object({
      shippingAddress: Yup.string().required("Shipping Address is required."),
      billingAddress: Yup.string().required("Billing Address is required."),
    }),
    role: Yup.string().matches(/seller|customer/, "Invalid value."),
    image: Yup.mixed()
      .test("required", "No any file uploaded.", (value) => {
        return value && value.length !== 0;
      })
      .test(
        "fileSize",
        "The file size is too large. Max file size 3 MB",
        (value) => {
          return value && value.length !== 0 && value[0].size <= 3000000;
        }
      )
      .test(
        "fileExtension",
        "Invalid file type. Please upload an image.",
        (value) => {
          return (
            value &&
            value.length !== 0 &&
            allowedExt.includes(value[0].name.split(".").pop().toLowerCase())
          );
        }
      ),
    // image: Yup,
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors } = formState;
  // console.log(errors);

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      // console.log(data);
      data.image = data.image[0];

      let response = await AuthServiceObj.register(data);
      // console.log(response);
      toast.success("Account has been registered.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/admin/user");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">User List</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="/admin/user">User List</NavLink>
          </li>
          <li className="breadcrumb-item active">Create User</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Create User</h4>
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
            <div className="container mb-5">
              <div className="row">
                <div className="col-lg-8">
                  <form
                    className="form"
                    onSubmit={handleSubmit(handleRegister)}
                    noValidate
                  >
                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Name:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="form-control"
                          placeholder="Enter your name"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.name?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="email" className="form-label fw-medium">
                          Email:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          className="form-control"
                          placeholder="Enter your email"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.email?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="phone" className="form-label fw-medium">
                          Phone:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="tel"
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                          className="form-control"
                          placeholder="Phone Number"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.phone?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label
                          htmlFor="shippingAddress"
                          className="form-label fw-medium"
                        >
                          Address 1:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="text"
                          {...register("address[shippingAddress]")}
                          className="form-control"
                          placeholder="Shipping Address"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.address?.shippingAddress?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label
                          htmlFor="billingAddress"
                          className="form-label fw-medium"
                        >
                          Address 2:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="text"
                          {...register("address[billingAddress]")}
                          className="form-control"
                          placeholder="Billing Address"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.address?.billingAddress?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="role" className="form-label fw-medium">
                          Role:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <select
                          className="form-select"
                          name="role"
                          {...register("role", {
                            required: "Role is required.",
                          })}
                        >
                          <option value="customer">Buyer</option>
                          <option value="seller">Seller</option>
                        </select>
                        <div className="text-danger mt-2">
                          {errors && errors.role?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label
                          htmlFor="formFile"
                          className="form-label fw-medium"
                        >
                          Avatar:
                        </label>
                      </div>

                      <div className={imageUrl ? "col-lg-7" : "col-lg-9"}>
                        <input
                          type="file"
                          className="form-control"
                          {...register("image", {
                            required: "Image is required.",
                          })}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              // console.log(imageUrl);
                              setImageUrl(imageUrl);
                            } else {
                              setImageUrl("");
                            }
                          }}
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.image?.message}
                        </div>
                      </div>
                      <div className="col-lg-2">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            width="100px"
                            height="100px !important"
                            className="rounded"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
                        <button className="btn btn-primary" disabled={loading}>
                          Register
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
