import React, { useEffect, useState } from "react";
import { Badge, Button, Nav } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { productServiceObj } from "../../cms/admin/product";
import { toast } from "react-toastify";
import { updateCart } from "../../../reducers/cart.reducers";

export const Cart = () => {
  const dispatch = useDispatch();
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { quantity, setQuantity } = useState(0);
  let cartItems = useSelector((store) => {
    return store.Cart.cart;
  });

  const getProductListCart = async () => {
    try {
      let response = await productServiceObj.getCartDetails(cartItems);
      setCartDetails(response.data.data);
      // console.log(response.data, "here");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = (id, qty) => {
    // console.log(id, qty);
    let currentItems = JSON.parse(localStorage.getItem("cart"));

    currentItems.map((item, i) => {
      if (id === item.productId) {
        currentItems[i].qty = qty + 1;
      }
    });

    localStorage.setItem("cart", JSON.stringify(currentItems));
    dispatch(updateCart());
    // console.log(currentItems);
  };

  const decreaseQty = (id, qty) => {
    let countClass = `count-${id}`;
    const count = document.querySelector("." + countClass);
    if (count.valueAsNumber < 2) return;
    let currentItems = JSON.parse(localStorage.getItem("cart"));

    currentItems.map((item, i) => {
      if (id === item.productId) {
        currentItems[i].qty = qty - 1;
      }
    });

    localStorage.setItem("cart", JSON.stringify(currentItems));
    dispatch(updateCart());
  };

  useEffect(() => {
    if (cartItems) {
      getProductListCart();
    }
  }, [cartItems]);

  // console.log(cartDetails);
  return (
    <div className="container-fluid nav-margin">
      {loading ? (
        <>
          <div className="fs-2 text-center">Loading...</div>
        </>
      ) : (
        <div className="row">
          <div className="col-md-10 col-11 mx-auto">
            {/* left-side */}
            <div className="row mt-5 gx-3">
              <div className="col-md-12 col-lg-8 col-11 mx-auto mb-lg-0 mb-5 shadow">
                {cartDetails &&
                  cartDetails.details.map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="cart p-2">
                        {i === 0 ? (
                          <>
                            <h2 className="py-2 fw-bold">
                              {cartDetails.details &&
                              cartDetails.details.length === 0
                                ? "Your cart is empty."
                                : `Cart (${cartDetails.details.length} Items)`}
                            </h2>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="row">
                          <div className="col-md-4 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow">
                            <NavLink>
                              <img
                                className="img-fluid"
                                src={`${
                                  import.meta.env.VITE_IMAGE_URL
                                }/products/${item.image}`}
                                alt=""
                                srcSet=""
                              />
                            </NavLink>
                          </div>
                          <div className="col-md-8 col-11 mx-auto px-4 mt-2">
                            <div className="row">
                              <div className="col-6 card-title">
                                <h6 className="mb-2 text-wrap">
                                  <NavLink
                                    to={`/product/${item?.slug}`}
                                    className={"nav-link"}
                                  >
                                    {item?.name}
                                  </NavLink>
                                </h6>
                                <div>
                                  <NavLink to={`/brand/${item.brand?._id}`}>
                                    <Badge bg="info" className="mb-2">
                                      {item?.brand?.name}
                                    </Badge>
                                  </NavLink>
                                </div>
                                {item?.afterDiscount !== null ? (
                                  <>
                                    <p
                                      style={{ margin: "0" }}
                                      className="fw-medium me-1"
                                    >
                                      Rs.{item.afterDiscount.toLocaleString()}
                                    </p>
                                    <span className="text-danger text-decoration-line-through me-1">
                                      Rs.{item.price.toLocaleString()}
                                    </span>
                                    <span className="fw-lighter">
                                      (-{item.prodDis}%)
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="fw-medium">
                                      Rs.{item.price.toLocaleString()}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div className="col-6">
                                {/* <div className="d-flex justify-content-end mb-2">
                      <Button variant="" type="button" className="icon btn">
                        <FaTrash size={18} className="icon me-2" />
                        Remove Item
                      </Button>
                    </div> */}
                                <div className="d-flex gap-1 justify-content-end align-items-center">
                                  {/* <label htmlFor="quantity" className="form-label mt-3">
                            Quantity:
                          </label> */}
                                  <span
                                    className="btn btn-primary minus"
                                    onClick={() =>
                                      decreaseQty(item.id, item.qty)
                                    }
                                  >
                                    -
                                  </span>

                                  <input
                                    style={{ width: "80px" }}
                                    type="number"
                                    className={`count-${item.id} form-control count d-inline`}
                                    readOnly
                                    value={item.qty}
                                  />

                                  <span
                                    className="btn btn-primary plus"
                                    onClick={() =>
                                      increaseQty(item.id, item.qty)
                                    }
                                  >
                                    +
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-4 d-flex">
                                <p>
                                  <Button
                                    variant=""
                                    type="button"
                                    className="icon btn ps-0"
                                  >
                                    <FaTrash /> Remove
                                  </Button>
                                </p>
                              </div>
                              <div className="col-8 d-flex justify-content-end">
                                <div className="fs-4">
                                  <span>Total: &nbsp;</span>
                                  <span className="text-primary">
                                    {item.amt.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}
              </div>
              {/* right-side */}
              <div className="col-md-12 col-lg-4 col-11 mx-auto">
                <div className="p-3 shadow bg-white">
                  <h2 className="mb-5">Order Summary</h2>
                  <div className="d-flex justify-content-between">
                    <p className="fw-light">SubTotal ( 4 Items)</p>
                    <p className="">
                      Rs. {cartDetails?.subTotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-light">Shipping Charge</p>
                    <p className="">
                      Rs. {cartDetails?.shippingFee.toLocaleString()}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-bold">Total</p>
                    <p className="text-primary">
                      Rs. {cartDetails?.totalAmt.toLocaleString()}
                    </p>
                  </div>
                  <hr />
                  <div className="d-flex flex-column">
                    <Button> Proceed to Checkout</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
