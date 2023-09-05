import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { bannerServiceObj } from ".";
import { toast } from "react-toastify";

export const AdminUpdateBanner = () => {
  const [loading, setLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [bannerDetails, setBannerDetails] = useState();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  let allowedExt = ["jpg", "png", "jpeg", "webp", "gif", "svg"];

  //   const bannerSchema = Yup.object().shape({
  //     title: Yup.string().required("Title is required."),
  //     link: Yup.string().url().nullable(),
  //     status: Yup.string()
  //       .matches(/active|inactive/, "Invalid value for status.")
  //       .default("inactive"),
  //     image: Yup.mixed()
  //       .test("required", "No any file uploaded.", (value) => {
  //         return value && value.length !== 0;
  //       })
  //       .test(
  //         "fileSize",
  //         "The file size is too large. Max file size 3 MB",
  //         (value) => {
  //           return value && value.length !== 0 && value[0].size <= 3000000;
  //         }
  //       )
  //       .test(
  //         "fileExtension",
  //         "Invalid file type. Please upload image.",
  //         (value) => {
  //           return (
  //             value &&
  //             value.length !== 0 &&
  //             allowedExt.includes(value[0].name.split(".").pop().toLowerCase())
  //           );
  //         }
  //       ),
  //   });

  const bannerSchema = Yup.object().shape({
    title: Yup.string().required("Title is required."),
    link: Yup.string().url().nullable(),
    status: Yup.string()
      .matches(/active|inactive/, "Invalid value for status.")
      .default("inactive"),
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
    resolver: yupResolver(bannerSchema),
  });
  const { errors } = formState;
  // console.log(errors);

  const handleUpdateBanner = async (data) => {
    if (data.image.length === 0) {
      data.image = bannerDetails.image;
    } else {
      data.image = data.image[0];
    }

    //API Integration

    try {
      setLoading(true);
      let response = await bannerServiceObj.updateBanner(data, id);
      toast.success(response?.data?.msg);
      navigate("/admin/banner");
      //   console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const getBannerDetails = async () => {
    try {
      let response = await bannerServiceObj.getBannerById(id);
      const bannerData = response.data?.data;
      setBannerDetails(bannerData);
      setValue("title", bannerData?.title);
      setValue("link", bannerData?.link);
      setValue("status", bannerData?.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBannerDetails();
  }, []);
  //   console.log(bannerDetails);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Banner List</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="/admin/banner">Banner List</NavLink>
          </li>
          <li className="breadcrumb-item active">Update Banner</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Update Banner</h4>
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
            <div className="container mb-5">
              <div className="row">
                <div className="col-lg-8">
                  <form
                    className="form"
                    onSubmit={handleSubmit(handleUpdateBanner)}
                  >
                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="title" className="form-label fw-medium">
                          Title:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="text"
                          {...register("title", {
                            required: "Title is required.",
                          })}
                          className="form-control"
                          placeholder="Enter title"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.title?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="email" className="form-label fw-medium">
                          URL:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="url"
                          {...register("link", {
                            required: "Link is required.",
                          })}
                          className="form-control"
                          placeholder="Enter link"
                        />
                        {/* <div className="text-danger mt-2">
                          {errors && errors.link?.message}
                        </div> */}
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
                          Image:
                        </label>
                      </div>

                      <div className="col-lg-7">
                        <input
                          className="form-control"
                          type="file"
                          {...register("image")}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
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
                          <img src={newImageUrl} className="img img-fluid" />
                        ) : bannerDetails && bannerDetails.image ? (
                          <img
                            src={`${import.meta.env.VITE_IMAGE_URL}/banner/${
                              bannerDetails.image
                            }`}
                            className="img img-fluid"
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
