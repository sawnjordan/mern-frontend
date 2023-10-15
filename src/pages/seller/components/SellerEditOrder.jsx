import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyOrder, getUserOrder } from "../../../reducers/order.reducers";
import userProdServiceObj from "../../home/product/product.services";
import Swal from "sweetalert2";

export const SellerEditOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderState = useSelector((state) => {
    return state.Order;
  });
  const { loading, myOrder } = orderState;
  const [status, setStatus] = useState("");
  const handleUpdateOrder = async () => {
    Swal.fire({
      title: "Cancel Order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel the order!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = {
            status,
          };
          let response = await userProdServiceObj.updateMyOrder(
            params.orderId,
            data
          );
          // console.log(response);
          toast.success(`${response.data?.msg}`);
          navigate("/customer/orders");
        } catch (error) {
          toast.error("Something went wrong while cancelling the order.");
        }
      }
    });
  };

  useEffect(() => {
    // Check if the order is not null before setting the values
    if (myOrder) {
      setStatus(myOrder.status);
    }
  }, [myOrder]);

  useEffect(() => {
    dispatch(getMyOrder(params?.orderId));
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="col-lg-8 text-white">Loading...</div>
        </>
      ) : myOrder && myOrder.length === 0 ? (
        <div className="col-lg-8 text-white">Order not found...</div>
      ) : (
        myOrder && (
          <>
            <section className="col-lg-8">
              <div className=" d-flex justify-content-around pt-lg-2 pb-4 pb-lg-5 mb-lg-3">
                <div className="col-12 col-lg-7 order-details">
                  <h1 className="mt-4">Order List</h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {myOrder.buyer.name}
                  </p>
                  <p>
                    <b>Phone:</b> {myOrder.buyer.phone}
                  </p>
                  <p className="mb-4">
                    <b>Address(Shipping): </b>
                    {myOrder.buyer.address.shippingAddress}
                  </p>
                  <p className="mb-4">
                    <b>Address(Billing): </b>
                    {myOrder.buyer.address.billingAddress}
                  </p>
                  <p>
                    <b>Amount:</b> Rs. {myOrder.totalAmt.toLocaleString()}
                  </p>

                  <hr />

                  <span className="fs-5 my-4">Payment Status: </span>
                  {myOrder.isPaid ? (
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
                    {myOrder.payment === "cod" ? <>Cash On Delivery</> : <></>}
                  </span>
                  <hr />
                  <span className="fs-5 my-4">Order Status: </span>

                  {myOrder.status === "new" ? (
                    <span className="text-info">New</span>
                  ) : myOrder.status === "pending" ? (
                    <span className="text-warn">Pending</span>
                  ) : myOrder.status === "cancelled" ? (
                    <span className="text-danger">Cancelled</span>
                  ) : (
                    <span className="text-success">Delivered</span>
                  )}
                  <hr />
                  <div className="">
                    <span className="fs-5 "> Payment Gateway: </span>
                    <span className="text-success">
                      {myOrder.payment === "cod" ? (
                        <>Cash On Delivery</>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <hr />
                  <h4 className="my-4">Order Items:</h4>

                  <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h6 className="modal-title">
                          Order No - {myOrder._id}
                        </h6>
                      </div>
                      <div className="modal-body pb-0">
                        {myOrder.orderDetails.map((detail, i) => (
                          <div
                            key={i}
                            className={`d-sm-flex justify-content-between my-4 ${
                              i === myOrder.orderDetails.length - 1
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
                          <span>{myOrder.shippingFee.toLocaleString()}</span>
                        </div>
                        <div className="px-2 py-1">
                          <span className="text-muted">Tax:&nbsp;</span>
                          <span>Rs. {myOrder.tax}</span>
                        </div>
                        <div className="px-2 py-1">
                          <span className="text-muted">Total:&nbsp;</span>
                          <span className="fs-lg">
                            Rs. {myOrder.totalAmt.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  {myOrder?.status === "delivered" ? (
                    <p className="text-success">Delivered</p>
                  ) : (
                    <>
                      <div className="form-group mb-3">
                        <select
                          className="form-select"
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          disabled={status === "cancelled" ? true : false}
                        >
                          <option value={myOrder.status} disabled>
                            {myOrder?.status === "pending" ? "Pending" : "New"}
                          </option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-primary btn-block"
                        type="button"
                        disabled={status === "cancelled" ? true : false}
                        onClick={(e) => {
                          e.preventDefault();
                          if (status === "new" || status === "pending") {
                            toast.warn("Status Not changed.");
                          } else {
                            handleUpdateOrder();
                          }
                        }}
                      >
                        Update Status
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>
          </>
        )
      )}
    </>
  );
};
