import React, { useEffect, useState } from "react";
import { Badge, Button, Nav } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { productServiceObj } from "../../cms/admin/product";
import { toast } from "react-toastify";
import { updateCart } from "../../../reducers/cart.reducers";
import Swal from "sweetalert2";

export const Cart = () => {
  const dispatch = useDispatch();
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove item!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let updatedItems = cartItems.filter((item) => {
          return item.productId !== id;
        });
        // console.log(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        dispatch(updateCart());
      }
    });
  };

  useEffect(() => {
    if (cartItems) {
      getProductListCart();
    }
  }, [cartItems]);

  console.log(cartDetails);
  return (
    <>
      {loading ? (
        <>
          <div className="row nav-margin bg-primary-l1">
            <div className="col">
              <h3 className="text-center p-3">Loading...</h3>
            </div>
          </div>
        </>
      ) : cartItems && cartItems.length === 0 ? (
        <>
          <div className="row nav-margin bg-light">
            <div className="col">
              <h2 className="text-center p-3">Your cart is empty!!</h2>
              <p className="text-center">
                <NavLink to={"/shop"}>Go to Shop</NavLink>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {cartDetails.details && (
            <div className="row nav-margin bg-primary-l1">
              <div className="col">
                <h3 className="text-center p-3">
                  Cart ({cartDetails.details.length} Items)
                </h3>
              </div>
            </div>
          )}

          <div className="container">
            <div className="row mt-4">
              <div className="col-xl-6 offset-xl-1">
                {cartDetails.details &&
                  cartDetails.details.map((item, i) => (
                    <div key={i} className="card border shadow-none">
                      <div className="card-body">
                        <div className="d-flex align-items-start border-bottom pb-3">
                          <div className="me-4">
                            <img
                              src={`${
                                import.meta.env.VITE_IMAGE_URL
                              }/products/${item.image}`}
                              alt=""
                              className="avatar-lg rounded"
                            />
                          </div>
                          <div className="flex-grow-1 align-self-start overflow-hidden">
                            <div>
                              <h5 className="text-wrap font-size-18">
                                <NavLink
                                  to={`/product/id/${item?.id}`}
                                  className={"nav-link"}
                                >
                                  {item?.name}
                                </NavLink>
                              </h5>

                              {/* <p className="mb-0 mt-1">
                                <NavLink to={`/brand/${item.brand?._id}`}>
                                  <Badge bg="info" className="mb-2">
                                    {item?.brand?.name}
                                  </Badge>
                                </NavLink>
                              </p> */}
                            </div>
                          </div>
                          <div className="flex-shrink-0 ms-2">
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Button
                                  variant=""
                                  type="button"
                                  className=" px-1 icon btn ps-0"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(item.id);
                                  }}
                                >
                                  <i className="fa fa-trash-can"></i>
                                </Button>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mt-3">
                                <p className="text-muted mb-2">Price</p>
                                <h6 className="mb-0 mt-2">
                                  {item?.afterDiscount !== null ? (
                                    <>
                                      <span className="me-1">
                                        Rs.{item.afterDiscount.toLocaleString()}
                                      </span>
                                      <span className="text-danger text-decoration-line-through me-1">
                                        Rs.{item.price.toLocaleString()}
                                      </span>
                                      <p className="fw-lighter">
                                        (-{item.prodDis}%)
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <span className="fw-medium">
                                        Rs.{item.price.toLocaleString()}
                                      </span>
                                    </>
                                  )}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <div className="mt-3">
                                <p className="text-muted mb-2">Quantity</p>
                                <div className="d-flex gap-1 align-items-center">
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
                            <div className="col-md-3">
                              <div className="mt-3">
                                <p className="text-muted mb-2">Total</p>
                                <h5 className="text-primary">
                                  {item.amt.toLocaleString()}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="row my-4">
                  <div className="col-sm-6">
                    <NavLink to={"/shop"}>
                      <i className="fa fa-arrow-left me-1"></i> Continue
                      Shopping
                    </NavLink>
                  </div>
                </div>
              </div>

              {cartItems && cartItems.length !== 0 ? (
                <>
                  <div className="col-xl-4">
                    <div className="mt-5 mt-lg-0">
                      <div className="card border shadow-none">
                        <div className="card-header bg-transparent border-bottom py-3 px-4">
                          <h5 className="font-size-16 mb-0">
                            Order Summary
                            <span className="float-end">#MN0124</span>
                          </h5>
                        </div>
                        <div className="card-body p-4 pt-2">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <tbody>
                                <tr>
                                  <td>Sub Total :</td>
                                  <td className="text-end">
                                    Rs. {cartDetails?.subTotal.toLocaleString()}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Discount : </td>
                                  <td className="text-end">
                                    {cartDetails?.discount ? (
                                      <>- Rs. {cartDetails?.discount}</>
                                    ) : (
                                      <>0</>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Shipping Charge :</td>
                                  <td className="text-end">
                                    Rs.{" "}
                                    {cartDetails?.shippingFee.toLocaleString()}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Estimated Tax : </td>
                                  <td className="text-end">
                                    {cartDetails?.tax}
                                  </td>
                                </tr>
                                <tr className="bg-light">
                                  <th>Total :</th>
                                  <td className="text-end">
                                    <span className="fw-bold">
                                      Rs.{" "}
                                      {cartDetails?.totalAmt.toLocaleString()}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="text-center d-flex flex-column mt-4">
                            <a
                              href="ecommerce-checkout.html"
                              className="btn btn-primary"
                            >
                              <i className="fa fa-cart-shopping me-1"></i>
                              Checkout
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
