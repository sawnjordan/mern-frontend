import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { bannerServiceObj } from ".";
import { toast } from "react-toastify";

export const AdminCreateBanner = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const navigate = useNavigate();
  let allowedExt = ["jpg", "png", "jpeg", "webp", "gif", "svg"];
  const bannerSchema = Yup.object().shape({
    title: Yup.string().required("Title is required."),
    link: Yup.string().url().nullable(),
    status: Yup.string()
      .matches(/active|inactive/, "Invalid value for status.")
      .default("inactive"),
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
        "Invalid file type. Please upload image.",
        (value) => {
          return (
            value &&
            value.length !== 0 &&
            allowedExt.includes(value[0].name.split(".").pop().toLowerCase())
          );
        }
      ),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(bannerSchema),
  });
  const { errors } = formState;
  // console.log(errors);

  const handleCreateBanner = async (data) => {
    // console.log(data, "before");
    data.image = data.image[0];

    //API Integration

    try {
      setLoading(true);
      let response = await bannerServiceObj.createBanner(data);
      toast.success(response?.data?.msg);
      navigate("/admin/banner");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    } finally {
      setLoading(false);
    }
  };
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
          <li className="breadcrumb-item active">Create Banner</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Create Banner</h4>
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
                    onSubmit={handleSubmit(handleCreateBanner)}
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

                      <div className={imageUrl ? "col-lg-7" : "col-lg-9"}>
                        <input
                          className="form-control"
                          type="file"
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
                          Create
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
