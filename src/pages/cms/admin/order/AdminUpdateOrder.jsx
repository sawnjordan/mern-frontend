import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { getUserOrder } from "../../../../reducers/order.reducers";
import userProdServiceObj from "../../../home/product/product.services";
import { toast } from "react-toastify";

export const AdminUpdateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderState = useSelector((state) => {
    return state.Order;
  });
  const { loading, order } = orderState;
  const [status, setStatus] = useState(null);
  const [isPaid, setIsPaid] = useState(null);
  const handelUpdateOrder = async () => {
    const data = {
      status,
      isPaid,
    };
    let response = await userProdServiceObj.updateUserOrder(params.id, data);
    // console.log(response);
    toast.success(`${response.data?.msg}`);
    navigate("/admin/orders");
  };

  useEffect(() => {
    // Check if the order is not null before setting the values
    if (order) {
      setStatus(order.status);
      setIsPaid(order.isPaid);
    }
  }, [order]);

  useEffect(() => {
    dispatch(getUserOrder(params?.id));
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="row bg-primary-l1">
            <div className="col">
              <h3 className="text-center p-3">Loading...</h3>
            </div>
          </div>
        </>
      ) : (
        order && (
          <>
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-7 order-details">
                <h1 className="mt-4">Order List</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/admin/orders">Order List</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Update Order</li>
                </ol>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {order.buyer.name}
                </p>
                <p>
                  <b>Phone:</b> {order.buyer.phone}
                </p>
                <p className="mb-4">
                  <b>Address(Shipping): </b>
                  {order.buyer.address.shippingAddress}
                </p>
                <p className="mb-4">
                  <b>Address(Billing): </b>
                  {order.buyer.address.billingAddress}
                </p>
                <p>
                  <b>Amount:</b> Rs. {order.totalAmt.toLocaleString()}
                </p>

                <hr />

                <span className="fs-5 my-4">Payment Status: </span>
                {order.isPaid ? (
                  <>
                    <span className="fs-5 text-success">PAID</span>
                  </>
                ) : (
                  <span className="text-danger">
                    <b>UN-PAID</b>
                  </span>
                )}
                <hr />

                <span className="fs-5 my-4">Payment ID: </span>
                <span className="text-success">
                  {order.payment === "cod" ? <>Cash On Delivery</> : <></>}
                </span>
                <hr />
                <span className="fs-5 my-4">Order Status: </span>

                {order.status === "new" ? (
                  <span className="text-info">New</span>
                ) : order.status === "pending" ? (
                  <span className="text-warn">Pending</span>
                ) : order.status === "cancelled" ? (
                  <span className="text-danger">Cancelled</span>
                ) : (
                  <span className="text-success">Delivered</span>
                )}
                <hr />
                <div className="">
                  <span className="fs-5 "> Payment Gateway: </span>
                  <span className="text-success">
                    {order.payment === "cod" ? <>Cash On Delivery</> : <></>}
                  </span>
                </div>
                <hr />
                <h4 className="my-4">Order Items:</h4>

                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h6 className="modal-title">Order No - {order._id}</h6>
                    </div>
                    <div className="modal-body pb-0">
                      {order.orderDetails.map((detail, i) => (
                        <div
                          key={i}
                          className={`d-sm-flex justify-content-between my-4 ${
                            i === order.orderDetails.length - 1
                              ? ""
                              : "pb-3 pb-sm-2 border-bottom"
                          } `}
                        >
                          <div className="d-sm-flex text-center text-sm-start">
                            <a
                              className="d-inline-block flex-shrink-0 mx-auto"
                              href="shop-single-v1.html"
                              style={{ width: "10rem" }}
                            >
                              <img
                                className="img img-fluid"
                                src={`${
                                  import.meta.env.VITE_IMAGE_URL
                                }/products/${detail.id.images[0]}`}
                                alt="Product"
                              />
                            </a>
                            <div className="ps-sm-4 pt-2">
                              <h6 className="product-title fs-base mb-2">
                                <a href={`/product/id/${detail.id._id}`}>
                                  {detail.id.name}
                                </a>
                              </h6>
                              {detail?.brand ? (
                                <>
                                  <div className="fs-sm">
                                    <span className="text-muted me-2">
                                      Brand:
                                    </span>
                                    {detail.brand.name}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                              {/* <div className="fs-sm">
                                    <span className="text-muted me-2">
                                      Color:
                                    </span>
                                    Pink / Beige / Dark blue
                                  </div> */}
                              <div className="fs-lg text-accent pt-2">
                                {/* 22.<small>50</small> */}
                                Rs. {detail.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
                            <div className="text-muted mb-2">Quantity:</div>
                            {detail.qty}
                          </div>
                          <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
                            <div className="text-muted mb-2">Subtotal</div>
                            {/* $22.<small>50</small> */}
                            Rs. {detail.amt.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="modal-footer flex-wrap justify-content-between bg-primary-l3 fs-md mb-3">
                      {/* <div className="px-2 py-1">
                            <span className="text-muted">Subtotal:&nbsp;</span>
                            <span>Rs. {subAmt.toLocaleString()}</span>
                          </div> */}
                      <div className="px-2 py-1">
                        <span className="text-muted">Shipping:&nbsp;</span>
                        <span>{order.shippingFee.toLocaleString()}</span>
                      </div>
                      <div className="px-2 py-1">
                        <span className="text-muted">Tax:&nbsp;</span>
                        <span>Rs. {order.tax}</span>
                      </div>
                      <div className="px-2 py-1">
                        <span className="text-muted">Total:&nbsp;</span>
                        <span className="fs-lg">
                          Rs. {order.totalAmt.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-3 mt-5">
                <h4 className="my-4">Status</h4>

                <div className="form-group mb-3">
                  <select
                    className="form-select"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <h4 className="my-4">Paid</h4>

                <div className="form-group mb-3">
                  <select
                    className="form-select"
                    name="status"
                    value={isPaid}
                    onChange={(e) => setIsPaid(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary btn-block"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handelUpdateOrder();
                  }}
                >
                  Update Status
                </button>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};
