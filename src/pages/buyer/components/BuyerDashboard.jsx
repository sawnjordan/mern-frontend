import React, { useEffect } from "react";

export const BuyerDashboard = () => {
  useEffect(() => {
    const togglePassword = document.querySelector(".password-toggle-check");
    const toggleConfirmPassword = document.querySelector("#confirm-password");
    const password = document.querySelector("#account-pass");
    const confirmPassword = document.querySelector("#account-confirm-pass");

    togglePassword.addEventListener("click", () => {
      // Toggle the type attribute using
      // getAttribute() method
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
    });
    toggleConfirmPassword.addEventListener("click", () => {
      // Toggle the type attribute using
      // getAttribute() method

      const confirmPasswordType =
        confirmPassword.getAttribute("type") === "password"
          ? "text"
          : "password";
      confirmPassword.setAttribute("type", confirmPasswordType);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      togglePassword.removeEventListener("click", () => {});
    };
  }, []);
  return (
    <section className="col-lg-8">
      <div className="d-none d-lg-flex justify-content-between align-items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
        <h6 className="fs-base text-light mb-0">
          Update you profile details below:
        </h6>
        <a className="btn btn-primary btn-sm" href="account-signin.html">
          <i className="ci-sign-out me-2"></i>Sign out
        </a>
      </div>
      <form>
        <div className="bg-secondary rounded-3 p-4 mb-4">
          <div className="d-flex align-items-center">
            <img
              className="rounded"
              src="img/shop/account/avatar.jpg"
              width="90"
              alt="Susan Gardner"
            />
            <div className="ps-3">
              <button
                className="btn btn-light btn-shadow btn-sm mb-2"
                type="button"
              >
                <i className="ci-loading me-2"></i>Change avatar
              </button>
              <div className="p mb-0 fs-ms text-muted">
                Upload JPG, GIF or PNG image. 300 x 300 required.
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-4 gy-3">
          <div className="col-sm-6">
            <label className="form-label" htmlFor="account-fn">
              First Name
            </label>
            <input
              className="form-control"
              type="text"
              id="account-fn"
              //   value="Susan"
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="account-ln">
              Last Name
            </label>
            <input
              className="form-control"
              type="text"
              id="account-ln"
              //   value="Gardner"
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="account-email">
              Email Address
            </label>
            <input
              className="form-control"
              type="email"
              id="account-email"
              //   value="s.gardner@example.com"
              disabled=""
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="account-phone">
              Phone Number
            </label>
            <input
              className="form-control"
              type="text"
              id="account-phone"
              //   value="+7 (805) 348 95 72"
              required=""
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="account-pass">
              New Password
            </label>
            <div className="password-toggle">
              <input
                className="form-control"
                type="password"
                id="account-pass"
              />
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input className="password-toggle-check" type="checkbox" />
                <span className="password-toggle-indicator"></span>
              </label>
            </div>
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="account-confirm-pass">
              Confirm Password
            </label>
            <div className="password-toggle">
              <input
                className="form-control"
                type="password"
                id="account-confirm-pass"
              />
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input
                  className="password-toggle-check"
                  id="confirm-password"
                  type="checkbox"
                />
                <span className="password-toggle-indicator"></span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <hr className="mt-2 mb-3" />
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <button className="btn btn-primary mt-3 mt-sm-0" type="button">
                Update profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
