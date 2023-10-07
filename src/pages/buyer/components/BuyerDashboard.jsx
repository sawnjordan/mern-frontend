import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userServiceObj } from "../../cms/admin/user";
import { getLoggedInUser } from "../../../reducers/user.reducers";
import { toast } from "react-toastify";

export const BuyerDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => {
    return state.User.loggedInUser;
  });

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
          //   console.log(value);
          if (typeof value !== "object") {
            return true;
          }
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
            // console.log(value);
            if (typeof value === "object") {
              return allowedExt.includes(
                value[0].name.split(".").pop().toLowerCase()
              );
            } else {
              return allowedExt.includes(value.split(".").pop().toLowerCase());
            }
          }
          return true;
        }
      ),
  });

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { errors } = formState;

  const handleUpdateUser = async (data) => {
    // console.log(data.name, data.email, data.phone, data.address);
    // console.log(data.image, "data.image");
    if (
      (data?.image && data.image.length === 0) ||
      !data.hasOwnProperty("image") ||
      data.image instanceof File
    ) {
      console.log("first");
      data.image = loggedInUser.image;
    } else {
      console.log("second first");
      data.image = data.image[0];
    }
    // console.log(data.image);
    //API Integration
    try {
      setLoading(true);
      let response = await userServiceObj.updateMe(data);
      toast.success(response?.data?.msg);
      //   navigate("/admin/user");
      console.log(response);
      dispatch(getLoggedInUser());
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("name", loggedInUser?.name);
    setValue("email", loggedInUser?.email);
    setValue("role", loggedInUser?.role);
    setValue("phone", loggedInUser?.phone);
    setValue("address[billingAddress]", loggedInUser?.address.billingAddress);
    setValue("address[shippingAddress]", loggedInUser?.address.shippingAddress);
    setValue("status", loggedInUser?.status);
  }, [loggedInUser]);

  return (
    <section className="col-lg-8">
      <div className="d-none d-lg-flex justify-content-between align-items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
        <h6 className="fs-base text-light mb-0">
          Update you profile details below:
        </h6>
        <a className="btn btn-primary btn-sm" href="account-signin.html">
          <i className="ci-sign-out me-2"></i>Sign out
        </a>
      </div>
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
            <label htmlFor="shippingAddress" className="form-label fw-medium">
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
            <label htmlFor="billingAddress" className="form-label fw-medium">
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
            <label htmlFor="formFile" className="form-label fw-medium">
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
            ) : loggedInUser && loggedInUser.image ? (
              <img
                width="100px"
                height="100px !important"
                className="rounded"
                src={`${import.meta.env.VITE_IMAGE_URL}/users/${
                  loggedInUser.image
                }`}
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
