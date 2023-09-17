import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { FaCircleNotch, FaCross, FaPlus, FaTimesCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
import { userServiceObj } from "../user";
import Swal from "sweetalert2";

export const AdminUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [catList, setCatList] = useState();
  const [brandList, setBrandList] = useState();
  const [sellerList, setSellerList] = useState();
  const [productDetails, setProductDetails] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
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
  const { register, handleSubmit, formState, setValue, watch } = useForm({
    resolver: yupResolver(productSchema),
  });
  const { errors } = formState;

  const handleUpdateProduct = async (data) => {
    // console.log(data);
    let catIds = data?.categories.map((cat) => {
      return cat.value;
    });
    catIds = catIds.join(",");
    data.categories = catIds;
    // console.log(data, "before");

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
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // data.image = data.image[0];

    //API Integration

    try {
      setLoading(true);
      let response = await productServiceObj.updateProduct(formData, id);
      toast.success(response?.data?.msg);
      navigate("/admin/product");
      //   console.log(response);
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
    const updatedImageUrl = [...newImageUrl];
    updatedImageUrl.splice(index, 1);
    setNewImageUrl(updatedImageUrl);

    const updatedImageData = [...watch("images")];
    updatedImageData.splice(index, 1);
    setValue("images", updatedImageData);
  };

  const handleDeleteImageFromServer = (imgName) => {
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
          let response = await productServiceObj.deleteImageFromServer(
            imgName,
            productDetails._id
          );
          console.log(response);
          if (response) {
            toast.success(response.data?.msg);
          }
          getProductById();
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong!!!");
        }
      }
    });
  };

  const getProductById = async () => {
    try {
      setLoading(true);
      let response = await productServiceObj.getProductById(id);
      //   console.log(response.data.data);
      let productData = response.data?.data;
      let selectedCats = productData?.categories.map((item) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      //   console.log(productData);
      //   defaultValue={[colourOptions[2], colourOptions[3]]}
      // defaultValue={[{value:"test",label:"test"}]}
      //   console.log(selectedCats);

      setProductDetails({ ...productData, categories: selectedCats });
      productData.categories = selectedCats;
      setValue("name", productData.name);
      setValue("categories", productData.categories);
      setValue("description", productData.description);
      setValue("costPrice", productData.costPrice);
      setValue("price", productData.price);
      setValue("discount", productData.discount);
      setValue("brand", productData?.brand?._id);
      setValue("sellerId", productData?.sellerId?._id);
      setValue("status", productData.status);
    } catch (error) {
      console.log(error);
      //   toast.warn("Error while fetching product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listAllCats();
    listAllBrands();
    listAllSellers();
    getProductById();
  }, []);
  //   console.log(productData);
  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
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
              <li className="breadcrumb-item active">Update Product</li>
            </ol>
            <div className="card mb-4">
              <div className="card-header">
                <Container>
                  <Row>
                    <Col sm={12} md={6}>
                      <h4>Update Product</h4>
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
                        onSubmit={handleSubmit(handleUpdateProduct)}
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
                              htmlFor="description"
                              className="form-label fw-medium"
                            >
                              Description:
                            </label>
                          </div>

                          <div className="col-lg-9">
                            <CKEditor
                              editor={ClassicEditor}
                              data={
                                productDetails && productDetails?.description
                              }
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
                            <label
                              htmlFor="cp"
                              className="form-label fw-medium"
                            >
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
                            <label
                              htmlFor="sp"
                              className="form-label fw-medium"
                            >
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
                            <label
                              htmlFor="discount"
                              className="form-label fw-medium"
                            >
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
                            <label
                              htmlFor="category"
                              className="form-label fw-medium"
                            >
                              Category:
                            </label>
                          </div>

                          <div className="col-lg-9">
                            <Select
                              //   value={productDetails?.categories}
                              defaultValue={productDetails?.categories}
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
                            <label
                              htmlFor="brand"
                              className="form-label fw-medium"
                            >
                              Brand:
                            </label>
                          </div>

                          <div className="col-lg-9">
                            <select
                              name="brand"
                              {...register("brand")}
                              className="form-select"
                            >
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
                            <label
                              htmlFor="seller"
                              className="form-label fw-medium"
                            >
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
                                  setNewImageUrl(imageUrl);
                                } else {
                                  setNewImageUrl("");
                                }
                              }}
                            />
                            <div className="text-danger mt-2">
                              {errors && errors.images?.message}
                            </div>
                          </div>
                          <div className="col-lg-9 offset-lg-3 mt-2">
                            {newImageUrl
                              ? newImageUrl.map((url, i) => (
                                  <React.Fragment key={i}>
                                    <div className="btn position-relative">
                                      <img
                                        src={url}
                                        width="100px"
                                        height="100px !important"
                                        className="rounded position-relative"
                                      />
                                      <NavLink
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleDeleteImage(i);
                                        }}
                                        className="position-absolute top-5 start-90 translate-middle  rounded-circle"
                                      >
                                        <FaTimesCircle />
                                      </NavLink>
                                    </div>
                                  </React.Fragment>
                                ))
                              : productDetails?.images.map((imgName, i) => (
                                  <React.Fragment key={i}>
                                    <div className="btn position-relative">
                                      <img
                                        src={`${
                                          import.meta.env.VITE_IMAGE_URL
                                        }/products/${imgName}`}
                                        width="100px"
                                        height="100px !important"
                                        className="rounded position-relative"
                                      />
                                      <NavLink
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleDeleteImageFromServer(imgName);
                                        }}
                                        className="position-absolute top-5 start-90 translate-middle  rounded-circle"
                                      >
                                        <FaTimesCircle />
                                      </NavLink>
                                    </div>
                                  </React.Fragment>
                                ))}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
