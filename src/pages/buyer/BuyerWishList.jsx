import React from "react";

export const BuyerWishList = () => {
  return (
    <section className="col-lg-8">
      <div className="d-none d-lg-flex justify-content-between align-items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
        <h6 className="fs-base text-light mb-0">
          List of items you added to wishlist:
        </h6>
        <a className="btn btn-primary btn-sm" href="account-signin.html">
          <i className="ci-sign-out me-2"></i>Sign out
        </a>
      </div>
      <div className="d-sm-flex justify-content-between mt-lg-4 mb-4 pb-3 pb-sm-2 border-bottom">
        <div className="d-block d-sm-flex align-items-start text-center text-sm-start">
          <a
            className="d-block flex-shrink-0 mx-auto me-sm-4"
            href="shop-single-v1.html"
            style={{ width: "10rem" }}
          >
            <img src="img/shop/cart/02.jpg" alt="Product" />
          </a>
          <div className="pt-2">
            <h3 className="product-title fs-base mb-2">
              <a href="shop-single-v1.html">TH Jeans City Backpack</a>
            </h3>
            <div className="fs-sm">
              <span className="text-muted me-2">Brand:</span>Tommy Hilfiger
            </div>
            <div className="fs-sm">
              <span className="text-muted me-2">Color:</span>Khaki
            </div>
            <div className="fs-lg text-accent pt-2">
              $79.<small>50</small>
            </div>
          </div>
        </div>
        <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
          <button className="btn btn-outline-danger btn-sm" type="button">
            <i className="ci-trash me-2"></i>Remove
          </button>
        </div>
      </div>
      <div className="d-sm-flex justify-content-between my-4 pb-3 pb-sm-2 border-bottom">
        <div className="d-block d-sm-flex align-items-start text-center text-sm-start">
          <a
            className="d-block flex-shrink-0 mx-auto me-sm-4"
            href="shop-single-v1.html"
            style={{ width: "10rem" }}
          >
            <img src="img/shop/cart/03.jpg" alt="Product" />
          </a>
          <div className="pt-2">
            <h3 className="product-title fs-base mb-2">
              <a href="shop-single-v1.html">3-Color Sun Stash Hat</a>
            </h3>
            <div className="fs-sm">
              <span className="text-muted me-2">Brand:</span>The North Face
            </div>
            <div className="fs-sm">
              <span className="text-muted me-2">Color:</span>Pink / Beige / Dark
              blue
            </div>
            <div className="fs-lg text-accent pt-2">
              $22.<small>50</small>
            </div>
          </div>
        </div>
        <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
          <button className="btn btn-outline-danger btn-sm" type="button">
            <i className="ci-trash me-2"></i>Remove
          </button>
        </div>
      </div>
      <div className="d-sm-flex justify-content-between mt-4">
        <div className="d-block d-sm-flex align-items-start text-center text-sm-start">
          <a
            className="d-block flex-shrink-0 mx-auto me-sm-4"
            href="shop-single-v1.html"
            style={{ width: "10rem" }}
          >
            <img src="img/shop/cart/04.jpg" alt="Product" />
          </a>
          <div className="pt-2">
            <h3 className="product-title fs-base mb-2">
              <a href="shop-single-v1.html">Cotton Polo Regular Fit</a>
            </h3>
            <div className="fs-sm">
              <span className="text-muted me-2">Size:</span>42
            </div>
            <div className="fs-sm">
              <span className="text-muted me-2">Color:</span>Light blue
            </div>
            <div className="fs-lg text-accent pt-2">
              $9.<small>00</small>
            </div>
          </div>
        </div>
        <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
          <button className="btn btn-outline-danger btn-sm" type="button">
            <i className="ci-trash me-2"></i>Remove
          </button>
        </div>
      </div>
    </section>
  );
};
