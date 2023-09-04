import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

export const AdminCreateBanner = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleCreateBanner = (data) => {
    console.log(data, "before");
    // data.image = data.image[0];
    // console.log(data);

    //API Integration
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
                    onSubmit={handleSubmit(handleCreateBanner)}
                  >
                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Title:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="name"
                          {...register("name", {
                            required: "Title is required.",
                          })}
                          className="form-control"
                          placeholder="Enter title"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.name?.message}
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
                        <div className="text-danger mt-2">
                          {errors && errors.link?.message}
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
                          Image:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="file"
                          {...register("image", {
                            required: "Image is required.",
                          })}
                          id="formFile"
                          name="image"
                          accept="image/*"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.image?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
                        <button className="btn btn-primary">Create</button>
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
