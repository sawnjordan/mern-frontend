import React, { useEffect } from "react";

export const SellerChangePassword = () => {
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
        <h6 className="fs-base text-light mb-0">Update you password below:</h6>
        <a className="btn btn-primary btn-sm" href="account-signin.html">
          <i className="ci-sign-out me-2"></i>Sign out
        </a>
      </div>
      <form>
        <div className="row gx-4 gy-3">
          <div className="col-sm-6">
            <label className="form-label" htmlFor="account-pass">
              New Password
            </label>
            <div className="password-toggle">
              <input
                className="form-control"
                type="password"
                id="account-pass"
                autoComplete="new-password"
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
                autoComplete="new-password"
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
