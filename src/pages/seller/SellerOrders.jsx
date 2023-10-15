import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrderServiceObj } from "../cms/admin/order";
import { format } from "date-fns";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

export const SellerOrders = () => {
  const [myOrder, setMyOrder] = useState();
  const [loading, setLoading] = useState(true);
  const { breadcrumb } = useOutletContext();

  const getMyOrders = async () => {
    try {
      let response = await OrderServiceObj.getMyOrders();
      // console.log(response);
      setMyOrder(response.data?.data);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);
  // console.log(myOrder);

  return (
    <>
      {loading ? (
        <>
          <div className="col-lg-8 text-white">Loading...</div>
        </>
      ) : (
        <>
          <section className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center pt-lg-2 pb-4 pb-lg-5 mb-lg-3">
              <div className="d-flex align-items-center">
                <h6 className="fs-base text-light mb-0">{breadcrumb?.text}</h6>
              </div>
              <a
                className="btn btn-primary btn-sm d-none d-lg-inline-block"
                href="account-signin.html"
              >
                <i className="ci-sign-out me-2"></i>Sign out
              </a>
            </div>
            <div className="table-responsive fs-md mb-4">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date Purchased</th>
                    <th>Buyer Name</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrder &&
                    myOrder.map((order, i) => (
                      <tr key={i}>
                        <td className="py-3">
                          <NavLink
                            className="nav-link-style fw-medium fs-sm"
                            data-bs-toggle="modal"
                            data-bs-target={`#order-detail-${order._id}`}
                          >
                            {order._id}
                          </NavLink>
                        </td>

                        <td className="py-3">
                          {format(new Date(order?.createdAt), "MMMM dd, yyyy")}
                        </td>
                        <td className="py-3">{order.buyer?.name}</td>

                        <td className="py-3">
                          {order.status === "new" ? (
                            <>
                              <span className="badge bg-info m-0">
                                In Progress
                              </span>
                            </>
                          ) : order.status === "cancelled" ? (
                            <span className="badge bg-danger m-0">
                              Cancelled
                            </span>
                          ) : order.status === "delivered" ? (
                            <span className="badge bg-success m-0">
                              Delivered
                            </span>
                          ) : (
                            <>
                              <span className="badge bg-warning m-0">
                                Pending
                              </span>
                            </>
                          )}
                        </td>
                        <td className="py-3">Rs. {order.totalAmt}</td>
                        <td className="py-3">
                          <NavLink to={`/customer/order/${order?._id}`}>
                            <Button
                              variant=""
                              className="link-success"
                              size="sm"
                            >
                              <FaEdit />
                            </Button>
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {myOrder &&
                myOrder.map((order, i) => (
                  <div
                    key={i}
                    className="modal fade"
                    id={`order-detail-${order._id}`}
                    aria-hidden="true"
                    aria-labelledby={`order-detail-${order._id}`}
                  >
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            Order No - {order._id}
                          </h5>
                          <button
                            className="btn-close"
                            type="button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
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
                                  <h5 className="product-title fs-base mb-2">
                                    <a href={`/product/id/${detail.id._id}`}>
                                      {detail.id.name}
                                    </a>
                                  </h5>
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
                        <div className="modal-footer flex-wrap justify-content-between bg-primary-l3 fs-md">
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
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};
