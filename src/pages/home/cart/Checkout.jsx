import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartServiceObj from "./cart.service";
import { resetCart } from "../../../reducers/cart.reducers";
import { productServiceObj } from "../../cms/admin/product";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [cartDetails, setCartDetails] = useState([]);

  const loggedInUser = useSelector((state) => {
    return state?.User?.loggedInUser;
  });

  let cartItems = useSelector((store) => {
    return store?.Cart.cart;
  });

  const placeOrder = useCallback(async (e) => {
    e.preventDefault();
    try {
      let orderDetails = await CartServiceObj.placeOrder(cartItems);
      dispatch(resetCart());
      toast.success(
        "Your order has been placed successfully. You will be confirmed by our representative."
      );
      navigate("/shop");
      //   console.log(orderDetails);
      //   console.log(cart);
    } catch (error) {
      toast.warn("Something went wrong. Please try again later.");
      //   navigate("/cart");
    }
  }, []);

  const getProductListCart = async () => {
    // console.log(cartItems, "inside");
    try {
      let response = await productServiceObj.getCartDetails(cartItems);
      setCartDetails(response.data.data);
      // console.log(response.data, "here");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartItems) {
      getProductListCart();
    }
  }, [cartItems]);
  // console.log(cartDetails);
  // console.log(cartItems);
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
      ) : (
        <>
          <div className="row nav-margin bg-primary-l1">
            <div className="col">
              <h3 className="text-center p-3">Checkout</h3>
            </div>
          </div>

          <div className="row">
            <section className="col-xl-6 offset-xl-1 pt-lg-4 pb-4 mb-3">
              <div className="pt-2 px-4 pe-lg-0 ps-xl-5">
                <div className="row pb-4 gx-4 gy-3">
                  <div className="col-12">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      type="text"
                      // value="Jonathan"
                      disabled
                      placeholder={loggedInUser?.name}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder={loggedInUser?.email}
                      disabled
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder={loggedInUser?.phone}
                      disabled
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address(Shipping):</label>
                    <input
                      className="form-control"
                      type="text"
                      disabled
                      placeholder={loggedInUser.address.shippingAddress}
                    />
                  </div>
                </div>
                <div
                  className="accordion mb-2"
                  id="payment-method"
                  role="tablist"
                >
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <a
                        className="accordion-button collapsed"
                        href="#card"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                      >
                        <i className="ci-card fs-lg me-2 mt-n1 align-middle"></i>
                        Payment
                      </a>
                    </h3>
                    <div
                      className="accordion-collapse collapse"
                      id="card"
                      data-bs-parent="#payment-method"
                      role="tabpanel"
                    >
                      <div className="accordion-body">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="payment"
                            id="COD"
                            value="cod"
                            checked
                          />
                          <label class="form-check-label" htmlFor="COD">
                            Cash On Delivery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {cartDetails && cartItems.length !== 0 ? (
              <>
                <div className="col-xl-4">
                  <div className="mt-5 mt-lg-0">
                    <div className="card border shadow-none">
                      <div className="card-header bg-transparent border-bottom py-3 px-4">
                        <h5 className="font-size-16 mb-0">
                          Order Summary
                          <span className="float-end"></span>
                        </h5>
                      </div>
                      <div className="card-body p-4 pt-2">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <tbody>
                              <tr>
                                <td>SubTotal :</td>
                                <td className="text-end">
                                  Rs. {cartDetails?.subTotal.toLocaleString()}
                                </td>
                              </tr>
                              <tr>
                                <td>Discount (Rs.) : </td>
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
                                <td>Estimated Tax (13%): </td>
                                <td className="text-end">
                                  Rs. {cartDetails?.tax.toLocaleString()}
                                </td>
                              </tr>
                              <tr className="bg-light">
                                <th>Total :</th>
                                <td className="text-end">
                                  <span className="fw-bold">
                                    Rs. {cartDetails?.totalAmt.toLocaleString()}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-center d-flex flex-column mt-4">
                          <button
                            onClick={placeOrder}
                            to="/checkout"
                            className="btn btn-primary"
                          >
                            Place Order
                          </button>
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
        </>
      )}
    </>
  );
};
