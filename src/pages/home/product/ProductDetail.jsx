import React, { useCallback, useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { productServiceObj } from "../../cms/admin/product";
import { Link, NavLink, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { ProductImagePreview } from "../../../components/common/product.image.preview";
import ReactImageMagnify from "react-image-magnify";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../../reducers/cart.reducers";

export const ProductDetail = ({ slug }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState();
  const [bigImgUrl, setBigImgUrl] = useState("");
  const params = useParams();

  const { productSlug, productId } = params;

  const [quantity, setQuantity] = useState(0);
  // console.log(productSlug);

  const getProductDetails = useCallback(async () => {
    try {
      let response;
      if (slug) {
        response = await productServiceObj.getProductBySlug(productSlug);
      } else {
        response = await productServiceObj.getProductDetailsById(productId);
      }
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
  }, [slug, productSlug, productId]);

  const increaseQty = () => {
    const stock = quantity + 1;
    setQuantity(stock);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 0) return;

    const stock = quantity - 1;
    setQuantity(stock);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    let currentItem = {
      productId: productDetails._id,
      qty: quantity,
    };
    // console.log(currentItem);
    dispatch(setCartItems(currentItem));
    toast.success(
      <span>
        Cart Updated Successfully. <a href="/cart">View Cart</a>
      </span>
    );
  };

  useEffect(() => {
    getProductDetails();
  }, [params, slug]);
  // console.log(productDetails);
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
                  <div className="product-image-height">
                    <ReactImageMagnify
                      className="img-thumbnail"
                      {...{
                        smallImage: {
                          alt: "Wristwatch by Ted Baker London",
                          isFluidWidth: true,
                          src: `${bigImgUrl}`,
                        },
                        largeImage: {
                          src: `${bigImgUrl}`,
                          width: 1200,
                          height: 1200,
                        },

                        shouldUsePositiveSpaceLens: true,
                      }}
                    />
                    {/* <img
                      src={`${bigImgUrl}`}
                      alt=""
                      className="img img-fluid mx-auto d-block"
                      id="product-img"
                      style={{ width: "50%" }}
                    /> */}
                  </div>
                  <p className="border-1 border-bottom border-primary"></p>
                  <Row>
                    {productDetails?.images.map((imgName, i) => (
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        key={i}
                        xs={3}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          width="132px"
                          height="132px"
                          src={`${
                            import.meta.env.VITE_IMAGE_URL
                          }/products/${imgName}`}
                          alt=""
                          onClick={(e) => setBigImgUrl(e.target?.src)}
                        />
                        {/* <ProductImagePreview
                          imgNames={productDetails?.images}
                          imgFolder={"products"}
                        /> */}
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col lg={6} className="mt-5 p-4 bg-primary-l4 rounded-2">
                  <div className="product-content-right">
                    <p style={{ margin: "0" }}>
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
                    <p style={{ margin: "0" }}>
                      {productDetails.categories.map((cat, i) => (
                        <NavLink key={i} to={`/category/${cat?.slug}`}>
                          <Badge bg="warning me-1 mt-3">{cat.name}</Badge>
                        </NavLink>
                      ))}
                    </p>
                    <p style={{ margin: "0" }} className="mb-2">
                      <NavLink to={`/brand/${productDetails.brand?.slug}`}>
                        <Badge bg="info" className="me-1 mt-4">
                          {productDetails.brand?.name}
                        </Badge>
                      </NavLink>
                    </p>
                    <h2>{productDetails?.name}</h2>
                    {productDetails?.afterDiscount !== null ? (
                      <>
                        <p className="fw-medium">
                          Rs.{productDetails.afterDiscount.toLocaleString()}
                          <span className="text-danger text-decoration-line-through me-1 ms-1">
                            Rs.{productDetails.price.toLocaleString()}
                          </span>
                          <span className="fw-lighter">
                            (-{productDetails.discount}%)
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="fw-medium fs-5">
                          Rs.{productDetails?.price.toLocaleString()}
                        </span>
                      </>
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
                    <span
                      className="btn btn-primary minus"
                      onClick={decreaseQty}
                    >
                      -
                    </span>

                    <input
                      style={{ width: "118px" }}
                      type="number"
                      className="count form-control count d-inline"
                      readOnly
                      value={quantity}
                    />

                    <span
                      className="btn btn-primary plus"
                      onClick={increaseQty}
                    >
                      +
                    </span>
                    {/* <input
                      style={{ width: "118px" }}
                      className="form-control mt-3"
                      type="number"
                      name="quantity"
                      id="quantity"
                      defaultValue="1"
                      onClick={}
                    /> */}
                  </div>

                  <p className="mt-3">
                    <button
                      onClick={handleAddToCart}
                      className="btn rounded-pill btn-primary"
                    >
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
                  <div className="product-description mt-3">
                    {parse(productDetails?.description)}
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};
