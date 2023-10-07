import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userServiceObj } from ".";
import { toast } from "react-toastify";

export const AdminUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [userDetails, setUserDetails] = useState();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  let allowedExt = ["jpg", "png", "jpeg", "webp", "gif", "svg"];

  const userSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email().required("Email is required."),
    phone: Yup.string().required("Phone is required."),
    address: Yup.object({
      shippingAddress: Yup.string().required("Shipping Address is required."),
      billingAddress: Yup.string().required("Billing Address is required."),
    }),
    role: Yup.string().matches(/seller|customer/, "Invalid value."),
    image: Yup.mixed()
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
        "Invalid file type. Please upload an image.",
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
    resolver: yupResolver(userSchema),
  });
  const { errors } = formState;
  // console.log(errors);

  const handleUpdateUser = async (data) => {
    if (data.image.length === 0) {
      data.image = userDetails.image;
    } else {
      data.image = data.image[0];
    }

    //API Integration

    try {
      setLoading(true);
      let response = await userServiceObj.updateUser(data, id);
      toast.success(response?.data?.msg);
      navigate("/admin/user");
      //   console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      let response = await userServiceObj.getUserById(id);
      const userData = response.data?.data;
      // console.log(userData);
      setUserDetails(userData);
      setValue("name", userData?.name);
      setValue("email", userData?.email);
      setValue("role", userData?.role);
      setValue("phone", userData?.phone);
      setValue("address[billingAddress]", userData?.address.billingAddress);
      setValue("address[shippingAddress]", userData?.address.shippingAddress);
      setValue("status", userData?.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  //   console.log(userDetails);
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
          <li className="breadcrumb-item active">Update User</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Update User</h4>
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
                    onSubmit={handleSubmit(handleUpdateUser)}
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
                          disabled
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

                      <div className="col-lg-7">
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
                              setNewImageUrl(imageUrl);
                            } else {
                              setNewImageUrl("");
                            }
                          }}
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.image?.message}
                        </div>
                      </div>
                      <div className="col-lg-2">
                        {newImageUrl ? (
                          <img
                            width="100px"
                            height="100px !important"
                            className="rounded"
                            src={newImageUrl}
                          />
                        ) : userDetails && userDetails.image ? (
                          <img
                            width="100px"
                            height="100px !important"
                            className="rounded"
                            src={`${import.meta.env.VITE_IMAGE_URL}/users/${
                              userDetails.image
                            }`}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          disabled={loading}
                        >
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
