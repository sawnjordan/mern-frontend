import React, { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import sellerServiceObj from "../seller.services";
import { useSelector } from "react-redux";

export const SellerProducts = () => {
  const { breadcrumb } = useOutletContext();
  const [sellerProducts, setSellerProducts] = useState();
  const [loading, setLoading] = useState(false);
  const { getProdCount } = useOutletContext();

  const productDetails = useSelector((state) => {
    return state?.Seller?.productDetails;
  });

  useEffect(() => {}, []);
  console.log(productDetails, "here");

  return (
    <>
      {loading ? (
        <>
          <div className="col-lg-8 text-white">Loading...</div>
        </>
      ) : (
        <>
          <section className="col-lg-8">
            <div className="d-none d-lg-flex justify-content-between align-items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
              <h6 className="fs-base text-light mb-0">{breadcrumb?.text}</h6>
              <a className="btn btn-primary btn-sm">
                <i className="ci-sign-out me-2"></i>Sign out
              </a>
            </div>

            {productDetails &&
              productDetails.map((item, i) => (
                <div
                  key={i}
                  class="d-block d-sm-flex align-items-center py-4 border-bottom"
                >
                  <a
                    class="d-block mb-3 mb-sm-0 me-sm-4 ms-sm-0 mx-auto"
                    href="marketplace-single.html"
                    style={{ width: "12.5rem" }}
                  >
                    <img
                      class="img img-fluid rounded-3"
                      src={`${import.meta.env.VITE_IMAGE_URL}/products/${
                        item?.productDetails.images[0]
                      }`}
                      alt="Product"
                    />
                  </a>
                  <div class="text-center text-sm-start">
                    <h3 class="h6 product-title mb-2">
                      <NavLink to={`/product/id/${item?.productDetails._id}`}>
                        {item?.productDetails?.name}
                      </NavLink>
                    </h3>
                    <div class="d-inline-block text-accent">
                      {/* Rs. {item.productDetails.price.toLocaleString()} */}
                      {item?.productDetails?.afterDiscount !== null ? (
                        <>
                          <p className="fw-medium">
                            Rs.
                            {item?.productDetails.afterDiscount.toLocaleString()}
                            <span className="text-danger text-decoration-line-through me-1 ms-1">
                              Rs.{item?.productDetails.price.toLocaleString()}
                            </span>
                            <span className="fw-lighter">
                              (-{item?.productDetails.discount}%)
                            </span>
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="fw-medium fs-5">
                            Rs.{item?.productDetails?.price.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                    <div class="d-inline-block text-muted fs-ms border-start ms-2 ps-2">
                      <>
                        Sales:{" "}
                        <span class="fw-medium">
                          {item?.totalQty.toLocaleString()}
                        </span>
                      </>
                    </div>
                    <div class="d-inline-block text-muted fs-ms border-start ms-2 ps-2">
                      <>
                        Earnings:{" "}
                        <span class="fw-medium">
                          Rs. {item?.totalAmt.toLocaleString()}
                        </span>
                      </>
                    </div>
                    <div class="d-flex justify-content-center justify-content-sm-start pt-3">
                      <button
                        class="btn bg-info bg-opacity-10 btn-icon me-2"
                        type="button"
                        data-bs-toggle="tooltip"
                        aria-label="Edit"
                        data-bs-original-title="Edit"
                      >
                        <i class="fa fa-edit text-info"></i>
                      </button>
                      <button
                        class="btn bg-danger bg-opacity-10 btn-icon"
                        type="button"
                        data-bs-toggle="tooltip"
                        aria-label="Delete"
                        data-bs-original-title="Delete"
                      >
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </>
      )}
    </>
  );
};
