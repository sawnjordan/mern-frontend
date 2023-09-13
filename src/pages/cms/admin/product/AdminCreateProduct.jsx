import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { FaCircleNotch, FaCross, FaPlus, FaTimesCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { productServiceObj } from ".";
import { toast } from "react-toastify";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { categoryServiceObj } from "../category";
import { brandServiceObj } from "../brand";
import UserService from "../user/user.service";
import { userServiceObj } from "../user";

export const AdminCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [catList, setCatList] = useState();
  const [brandList, setBrandList] = useState();
  const [sellerList, setSellerList] = useState();
  const navigate = useNavigate();
  let allowedExt = ["jpg", "png", "jpeg", "webp", "gif", "svg"];
  const productSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    categories: Yup.array().required("Category is required."),
    description: Yup.string().nullable(),
    costPrice: Yup.number().min(1).required("Cost Price is required."),
    price: Yup.number().min(1).required("Selling Price is required."),
    discount: Yup.number().min(0).default(0),
    brand: Yup.string().required("Brand is required."),
    sellerId: Yup.string().nullable(),
    status: Yup.string()
      .matches(/active|inactive/, "Invalid value for status.")
      .default("inactive"),
    images: Yup.mixed()
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
  const { register, handleSubmit, formState, setValue, watch } = useForm({
    resolver: yupResolver(productSchema),
  });
  const { errors } = formState;

  const handleCreateProduct = async (data) => {
    let catIds = data?.categories.map((cat) => {
      return cat.value;
    });
    catIds = catIds.join(",");
    data.categories = catIds;
    console.log(data, "before");

    const formData = new FormData();
    Object.keys(data).map((fieldName) => {
      if (fieldName === "images") {
        Object.values(data.images).map((image) => {
          formData.append("images", image, image.name);
        });
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    });
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    // data.image = data.image[0];

    //API Integration

    try {
      setLoading(true);
      let response = await productServiceObj.createProduct(formData);
      toast.success(response?.data?.msg);
      navigate("/admin/product");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const listAllCats = async () => {
    try {
      const catData = await categoryServiceObj.getAllAdminCategory();
      let catOption = [];
      if (catData.data.data) {
        catOption = catData.data.data.map((data) => {
          return { label: data.name, value: data._id };
        });
      }

      setCatList(catOption);
    } catch (error) {
      console.log(error);
    }
  };

  const listAllBrands = async () => {
    try {
      const brandData = await brandServiceObj.getAllAdminBrand();
      setBrandList(brandData.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listAllSellers = async () => {
    try {
      const sellerData = await userServiceObj.getUserByRole("seller");
      // console.log(sellerData.data?.data);
      setSellerList(sellerData.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImageUrl = [...imageUrl];
    updatedImageUrl.splice(index, 1);
    setImageUrl(updatedImageUrl);

    const updatedImageData = [...watch("images")];
    updatedImageData.splice(index, 1);
    setValue("images", updatedImageData);
  };

  useEffect(() => {
    listAllCats();
    listAllBrands();
    listAllSellers();
  }, []);
  // console.log(catList);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Product List</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="/admin/product">Product List</NavLink>
          </li>
          <li className="breadcrumb-item active">Create Product</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <h4>Create Product</h4>
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
            <div className="container mb-5">
              <div className="row">
                <div className="col-lg-8">
                  <form
                    className="form"
                    onSubmit={handleSubmit(handleCreateProduct)}
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
                        <label htmlFor="name" className="form-label fw-medium">
                          Description:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <CKEditor
                          editor={ClassicEditor}
                          data=""
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setValue("description", data);
                          }}
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.description?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Cost Price:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="number"
                          {...register("costPrice", {
                            required: "Cost Price is required.",
                          })}
                          className="form-control"
                          placeholder="Enter cost price"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.costPrice?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Selling Price:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="number"
                          {...register("price", {
                            required: "Selling Price is required.",
                          })}
                          className="form-control"
                          placeholder="Enter selling price"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.price?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Discount (%):
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <input
                          type="number"
                          {...register("discount")}
                          className="form-control"
                          min={0}
                          max={100}
                          placeholder="Enter discount percentage"
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.discount?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Category:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <Select
                          defaultValue={[]}
                          isMulti
                          {...register("categories")}
                          options={catList}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedOptions) => {
                            setValue("categories", selectedOptions);
                          }}
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.categories?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Brand:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <select {...register("brand")} className="form-select">
                          <option value="">-- Select --</option>
                          {brandList &&
                            brandList.map((brand, i) => (
                              <option key={i} value={brand._id}>
                                {brand.name}
                              </option>
                            ))}
                        </select>
                        <div className="text-danger mt-2">
                          {errors && errors.brand?.message}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-3 d-flex align-items-center">
                        <label htmlFor="name" className="form-label fw-medium">
                          Seller:
                        </label>
                      </div>

                      <div className="col-lg-9">
                        <select
                          {...register("sellerId")}
                          className="form-select"
                        >
                          <option value="">-- Select --</option>
                          {sellerList &&
                            sellerList.map((seller, i) => (
                              <option key={i} value={seller._id}>
                                {seller.name}
                              </option>
                            ))}
                        </select>
                        <div className="text-danger mt-2">
                          {errors && errors.sellerId?.message}
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

                      <div className={"col-lg-9"}>
                        <input
                          multiple
                          className="form-control"
                          type="file"
                          {...register("images", {
                            required: "Image is required.",
                          })}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files;
                            let imageUrl = [];
                            if (file) {
                              Object.values(file).map((image) => {
                                // const imageUrlBlob = URL.createObjectURL(file);
                                imageUrl.push(URL.createObjectURL(image));
                              });
                              // console.log(imageUrl);
                              setImageUrl(imageUrl);
                            } else {
                              setImageUrl("");
                            }
                          }}
                        />
                        <div className="text-danger mt-2">
                          {errors && errors.images?.message}
                        </div>
                      </div>
                      <div className="col-lg-9 offset-lg-3 mt-2">
                        {imageUrl ? (
                          imageUrl.map((url, i) => (
                            <React.Fragment key={i}>
                              <div className="btn position-relative">
                                <img
                                  src={url}
                                  width="100px"
                                  height="100px !important"
                                  className="rounded position-relative"
                                />
                                <NavLink
                                  onClick={() => handleDeleteImage(i)}
                                  className="position-absolute top-5 start-90 translate-middle  rounded-circle"
                                >
                                  <FaTimesCircle />
                                </NavLink>
                              </div>
                            </React.Fragment>
                          ))
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
