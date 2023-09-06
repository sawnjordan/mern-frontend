import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryServiceObj } from ".";
import { toast } from "react-toastify";

export const AdminUpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [categoryDetails, setCategoryDetails] = useState();
  const [catList, setCatList] = useState();

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  let allowedExt = ["jpg", "png", "jpeg", "webp", "gif", "svg"];

  //   const categorySchema = Yup.object().shape({
  //     name: Yup.string().required("Name is required."),
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

  const categorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    parent: Yup.string().nullable(),
    status: Yup.string()
      .matches(/active|inactive/, "Invalid value for status.")
      .default(""),
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
    resolver: yupResolver(categorySchema),
  });
  const { errors } = formState;
  // console.log(errors);

  const handleUpdateCategory = async (data) => {
    if (data.image.length === 0) {
      data.image = categoryDetails.image;
    } else {
      data.image = data.image[0];
    }

    //API Integration

    try {
      setLoading(true);
      let response = await categoryServiceObj.updateCategory(data, id);
      toast.success(response?.data?.msg);
      navigate("/admin/category");
      //   console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryDetails = async () => {
    try {
      setLoading(true);
      let response = await categoryServiceObj.getCategoryById(id);
      const categoryData = response.data?.data;
      // console.log(categoryData);

      setCategoryDetails(categoryData);
      setValue("name", categoryData?.name);
      setValue("status", categoryData?.status);
      setValue("parent", categoryData?.parent?._id);

      // const parentCat =
      //   catList &&
      //   catList.find((cat) => cat.name === categoryData.parent?.name);
      // // console.log(parentCat);

      // if (parentCat) {
      //   setValue("parent", parentCat._id);
      // } else {
      //   setValue("parent", "");
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const listAllCats = async () => {
    try {
      setLoading(true);
      const catData = await categoryServiceObj.getAllAdminCategory();
      setCatList(catData.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listAllCats();
    getCategoryDetails();
  }, []);

  // console.log(catList);
  //   console.log(categoryDetails);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="container-fluid px-4">
          <h1 className="mt-4">Category List</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <NavLink to="/admin">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/admin/category">Category List</NavLink>
            </li>
            <li className="breadcrumb-item active">Update Category</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
              <Container>
                <Row>
                  <Col sm={12} md={6}>
                    <h4>Update Category</h4>
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
              <div className="container mb-5">
                <div className="row">
                  <div className="col-lg-8">
                    {categoryDetails && !loading ? (
                      <form
                        className="form"
                        onSubmit={handleSubmit(handleUpdateCategory)}
                      >
                        <div className="row">
                          <div className="col-lg-3 d-flex align-items-center">
                            <label
                              htmlFor="name"
                              className="form-label fw-medium"
                            >
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
                            <label
                              htmlFor="role"
                              className="form-label fw-medium"
                            >
                              Parent:
                            </label>
                          </div>

                          <div className="col-lg-9">
                            <select
                              className="form-select"
                              name="parent"
                              {...register("parent")}
                            >
                              <option value="">-- Select --</option>
                              {catList &&
                                catList.map((cat, index) => (
                                  <option value={cat._id} key={index}>
                                    {cat.name}
                                  </option>
                                ))}
                            </select>
                            <div className="text-danger mt-2">
                              {errors && errors.parent?.message}
                            </div>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-lg-3 d-flex align-items-center">
                            <label
                              htmlFor="role"
                              className="form-label fw-medium"
                            >
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
                              <img
                                src={newImageUrl}
                                className="img img-fluid shadow-lg"
                              />
                            ) : categoryDetails && categoryDetails.image ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_IMAGE_URL
                                }/category/${categoryDetails.image}`}
                                className="img img-fluid shadow-lg"
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
                              disabled={loading}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div>Loading details...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
