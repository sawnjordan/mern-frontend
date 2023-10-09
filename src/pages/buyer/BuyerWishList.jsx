import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWishlist,
  updateUserWishlist,
} from "../../reducers/wishlist.reducers";
import { NavLink, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

export const BuyerWishList = () => {
  const dispatch = useDispatch();
  const { breadcrumb } = useOutletContext();

  const { wishlist, loading } = useSelector((state) => {
    if (state?.Wishlist) {
      return state?.Wishlist;
    }
  });
  const loggedInUser = useSelector((state) => {
    if (state?.User.loggeInUser) {
      return state?.User.loggeInUser;
    }
  });
  const handleUpdateWishlist = (productId) => {
    try {
      dispatch(updateUserWishlist(productId));
      // console.log(wishlist);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    // if (loggedInUser) {
    dispatch(getUserWishlist());
    // }
  }, [loggedInUser, dispatch]);
  // console.log(wishlist?.wishlist, "here");
  return (
    <>
      {loading ? (
        <>
          <section className="col-lg-8">
            <div className="d-none d-lg-flex justify-content-between align-items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
              <h6 className="fs-base text-light mb-0">Loading...</h6>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="col-lg-8">
            <div className="d-none d-lg-flex justify-content-between align-items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
              <h6 className="fs-base text-light mb-0">{breadcrumb?.text}</h6>
              <a className="btn btn-primary btn-sm" href="account-signin.html">
                <i className="ci-sign-out me-2"></i>Sign out
              </a>
            </div>
            {wishlist &&
              wishlist?.wishlist.map((item, i) => (
                <div
                  key={i}
                  className="d-sm-flex justify-content-between mt-lg-4 mb-4 pb-3 pb-sm-2 border-bottom"
                >
                  <div className="d-block d-sm-flex align-items-start text-center text-sm-start">
                    <a
                      className="d-block flex-shrink-0 mx-auto me-sm-4"
                      href="shop-single-v1.html"
                      style={{ width: "10rem" }}
                    >
                      <img
                        className="img img-fluid"
                        src={`${import.meta.env.VITE_IMAGE_URL}/products/${
                          item.images[0]
                        }`}
                        alt="Product"
                      />
                    </a>
                    <div className="pt-2">
                      <h6 className="product-title fs-base mb-2">
                        <NavLink to={`/product/id/${item._id}`}>
                          {item.name}
                        </NavLink>
                      </h6>
                      <div className="fs-sm">
                        <span className="text-muted me-2">Brand:</span>
                        {item?.brand?.name}
                      </div>
                      {/* <div className="fs-sm">
                        <span className="text-muted me-2">Color:</span>Khaki
                      </div> */}
                      <div className="fs-lg text-accent pt-2">
                        {/* $79.<small>50</small> */}
                        {/* Rs. {item.price.toLocaleString()} */}
                        {item?.afterDiscount !== null ? (
                          <>
                            <span className="me-1">
                              Rs.{item.afterDiscount.toLocaleString()}
                            </span>
                            <span className="text-danger text-decoration-line-through me-1">
                              Rs.{item.price.toLocaleString()}
                            </span>
                            <p className="fw-lighter">(-{item.discount}%)</p>
                          </>
                        ) : (
                          <>
                            <span className="fw-medium">
                              Rs.{item.price.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdateWishlist(item._id);
                      }}
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                    >
                      <i className="fa fa-trash me-2"></i>Remove
                    </button>
                  </div>
                </div>
              ))}
          </section>
        </>
      )}
    </>
  );
};
