import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { productServiceObj } from "../../cms/admin/product";
import { NavLink, useParams } from "react-router-dom";
import parse from "html-react-parser";

export const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const [bigImgUrl, setBigImgUrl] = useState("");
  const params = useParams();
  const { productSlug } = params;
  // console.log(productSlug);

  const getProductDetails = async () => {
    try {
      let response = await productServiceObj.getProductBySlug(productSlug);
      // console.log(response);
      setProductDetails(response.data?.data);
      setBigImgUrl(
        `${import.meta.env.VITE_IMAGE_URL}/products/${
          response.data?.data?.images[0]
        }`
      );
    } catch (error) {
      toast.error(error.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  console.log(productDetails);
  return (
    <>
      {loading ? (
        <>
          <div className="nav-margin text-center fw-medium h3">Loading...</div>
        </>
      ) : (
        <>
          {productDetails && (
            <Container className="nav-margin">
              <Row>
                <Col lg={6} className="mt-5">
                  <img
                    src={`${bigImgUrl}`}
                    alt=""
                    className="mx-auto d-block"
                    id="product-img"
                    style={{ width: "50%" }}
                  />
                  <p className="border-1 border-bottom border-primary"></p>
                  <Row>
                    {productDetails?.images.map((imgName, i) => (
                      <Col lg={3} key={i} style={{ cursor: "pointer" }}>
                        <img
                          className="img-thumbnail small-img"
                          src={`${
                            import.meta.env.VITE_IMAGE_URL
                          }/products/${imgName}`}
                          alt=""
                          onClick={(e) => setBigImgUrl(e.target?.src)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col lg={6} className="mt-5 p-4 bg-primary-l4 rounded-2">
                  <div className="product-content-right">
                    <p>
                      <NavLink
                        className={"nav-link"}
                        style={{ display: "inline-block" }}
                        to={"/shop"}
                      >
                        Home
                      </NavLink>{" "}
                      /{" "}
                      <NavLink
                        className={"nav-link"}
                        style={{ display: "inline-block" }}
                        to={`/brand/${productDetails?.brand?._id}`}
                      >
                        {productDetails?.brand?.name}
                      </NavLink>
                    </p>
                    <h2>{productDetails?.name}</h2>
                    {productDetails?.afterDiscount !== null ? (
                      <>
                        <p className="fw-medium">
                          Rs.{productDetails.afterDiscount}
                          <span className="text-danger text-decoration-line-through me-1 ms-1">
                            Rs.{productDetails.price}
                          </span>
                          <span className="fw-lighter">
                            (-{productDetails.discount}%)
                          </span>
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* <select
                    className="form-select mt-3"
                    style={{ width: "200px" }}
                    aria-label="Select Size"
                    defaultValue={""}
                  >
                    <option value="">Select Size</option>
                    <option value="xxl">XXL</option>
                    <option value="xl">XL</option>
                    <option value="large">Large</option>
                    <option value="medium">Medium</option>
                    <option value="small">Small</option>
                  </select> */}
                  <div className="d-flex gap-3 align-items-center">
                    <label htmlFor="quantity" className="form-label mt-3">
                      Quantity:
                    </label>
                    <input
                      style={{ width: "118px" }}
                      className="form-control mt-3"
                      type="number"
                      name="quantity"
                      id="quantity"
                      defaultValue="1"
                    />
                  </div>

                  <p className="mt-3">
                    <button className="btn rounded-pill btn-primary">
                      Add To Cart
                    </button>
                  </p>
                  <p className="border-1 border-bottom border-primary-subtle"></p>
                  <h3>Product Description</h3>
                  <p>
                    The new 15‑inch MacBook Air makes room for more of what you
                    love with a spacious Liquid Retina display. And with the
                    13‑inch model, you have more reasons than ever to choose
                    Air. Supercharged by the M2 chip — and with up to 18 hours
                    of battery life1 — both laptops deliver blazing-fast
                    performance in an ultraportable design.
                  </p>
                </Col>
              </Row>
              <Row className="bg-body-tertiary mt-4 mb-4 rounded-2 p-2">
                <Col md={{ span: 10, offset: 1 }} className="mt-3">
                  <h3>Product Details</h3>
                  {parse(productDetails?.description)}
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};
