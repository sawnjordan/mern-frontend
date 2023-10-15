import React, { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import sellerServiceObj from "../seller.services";

export const SellerProducts = () => {
  const { breadcrumb } = useOutletContext();
  const [sellerProducts, setSellerProducts] = useState();
  const [sellerProdMeta, setSellerProdMeta] = useState();
  const [loading, setLoading] = useState(false);
  const { getProdCount } = useOutletContext();

  const getSellerProducts = async () => {
    try {
      setLoading(true);
      let response = await sellerServiceObj.getSellerProducts();
      setSellerProducts(response.data?.data);
      setSellerProdMeta(response.data?.result);
      const prodLenght = response.data?.data.length;
      getProdCount(prodLenght);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellerProducts();
  }, []);
  console.log(sellerProducts);

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

            {sellerProducts &&
              sellerProducts.map((item, i) => (
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
                        item.images[0]
                      }`}
                      alt="Product"
                    />
                  </a>
                  <div class="text-center text-sm-start">
                    <h3 class="h6 product-title mb-2">
                      <NavLink to={`/product/id/${item._id}`}>
                        {item?.name}
                      </NavLink>
                    </h3>
                    <div class="d-inline-block text-accent">
                      {/* Rs. {item.price.toLocaleString()} */}
                      {item?.afterDiscount !== null ? (
                        <>
                          <p className="fw-medium">
                            Rs.{item.afterDiscount.toLocaleString()}
                            <span className="text-danger text-decoration-line-through me-1 ms-1">
                              Rs.{item.price.toLocaleString()}
                            </span>
                            <span className="fw-lighter">
                              (-{item.discount}%)
                            </span>
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="fw-medium fs-5">
                            Rs.{item?.price.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                    <div class="d-inline-block text-muted fs-ms border-start ms-2 ps-2">
                      {sellerProdMeta.map((prod) => (
                        <>
                          {prod.prodId === item._id ? (
                            <>
                              Sales:{" "}
                              <span class="fw-medium">
                                {prod.totalProdQty.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </div>
                    <div class="d-inline-block text-muted fs-ms border-start ms-2 ps-2">
                      {sellerProdMeta.map((prod) => (
                        <>
                          {prod.prodId === item._id ? (
                            <>
                              Earnings:{" "}
                              <span class="fw-medium">
                                Rs. {prod.totalProdAmt.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
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
