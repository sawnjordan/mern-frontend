import React, { useCallback, useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { productServiceObj } from "../../cms/admin/product";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { ProductImagePreview } from "../../../components/common/product.image.preview";
import ReactImageMagnify from "react-image-magnify";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../../reducers/cart.reducers";
import userProdServiceObj from "./product.services";
import { FaHeart } from "react-icons/fa";
import { getUserWishlist } from "../../../reducers/wishlist.reducers";
import { Tooltip } from "react-tooltip";

export const ProductDetail = ({ slug }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState();
  const [wishlistAdded, setWishlistAdded] = useState();
  const [bigImgUrl, setBigImgUrl] = useState("");
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const loggedInUser = useSelector((state) => {
    if (state.User?.loggedInUser) {
      return state.User?.loggedInUser;
    }
  });
  const wishlist = useSelector((state) => {
    if (state.Wishlist?.wishlist) {
      return state.Wishlist?.wishlist;
    }
  });
  const params = useParams();

  const { productSlug, productId } = params;

  const [quantity, setQuantity] = useState(1);
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
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= productDetails.stock) return;

    const stock = count.valueAsNumber + 1;
    setQuantity(stock);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;

    const stock = count.valueAsNumber - 1;
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

  const handleAddToWishlist = async (productId) => {
    // console.log(productId);
    // console.log(loggedInUser);
    if (!loggedInUser) {
      toast.warn("Please Login First.");
      navigate("/login");
    } else {
      try {
        let response = await userProdServiceObj.addToWishlist(productId);
        // const wishlistData = response.data?.data;
        const isAdded = response.data?.isAdded;
        // console.log(wishlistData);
        if (isAdded) {
          toast.success("Product added to wishlist.");
        } else {
          toast.success("Product removed from wishlist.");
        }
        dispatch(getUserWishlist());
      } catch (error) {
        toast.error("Something went wrong!!");
      }
    }
  };

  const isWishListAdded = () => {
    if (productDetails && wishlist) {
      const isAdded = wishlist.wishlist.filter((item) => {
        return item._id === productDetails._id;
      });
      if (isAdded.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    setIsInWishlist(isWishListAdded());
  }, [wishlist]);

  useEffect(() => {
    getProductDetails();
    if (loggedInUser) {
      dispatch(getUserWishlist());
    }
  }, [params, slug, loggedInUser]);

  // console.log(isInWishlist, "here");
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
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
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
                      </div>
                      <div className="div">
                        {!loggedInUser ? (
                          <>
                            <button
                              className="btn-wishlist me-0 me-lg-n3"
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToWishlist(productDetails._id);
                              }}
                            >
                              <FaHeart
                                data-tooltip-id="wishlist-add"
                                size={26}
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            {wishlist && productDetails && (
                              <>
                                <button
                                  className={
                                    isInWishlist
                                      ? "btn-wishlist-added me-0 me-lg-n3"
                                      : "btn-wishlist me-0 me-lg-n3"
                                  }
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToWishlist(productDetails._id);
                                  }}
                                  data-tooltip-id={
                                    isInWishlist === undefined
                                      ? ""
                                      : isInWishlist
                                      ? "wishlist-remove"
                                      : "wishlist-add"
                                  }
                                >
                                  <FaHeart
                                    // data-tooltip-id="wishlist-remove"

                                    size={26}
                                  />
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>

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
                  <p>
                    Status:{" "}
                    {productDetails?.stock === 0 ? (
                      <>
                        <Badge bg="danger" className="p-1">
                          Out of Stock
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Badge bg="success" className="p-1">
                          In Stock
                          {productDetails?.stock <= 5 ? (
                            <> ( {productDetails.stock} Item/s )</>
                          ) : (
                            <></>
                          )}
                        </Badge>
                      </>
                    )}
                  </p>

                  <p className="mt-3">
                    <button
                      onClick={handleAddToCart}
                      className="btn rounded-pill btn-primary"
                      disabled={productDetails?.stock === 0 ? true : false}
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

          <Tooltip id="wishlist-add" content="Add To Wishlist" />
          <Tooltip id="wishlist-remove" content="Remove From Wishlist" />
        </>
      )}
    </>
  );
};
