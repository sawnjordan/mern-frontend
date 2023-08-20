import React from "react";

export const ForgotPassword = () => {
  return (
    <>
      <div className="container-fluid mt-5 mb-5 nav-margin">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-10 offset-sm-1 mt-3 p-4 rounded-4 shadow-lg bg-secondary-subtle">
            <h2 className="text-center">Forgot Password</h2>
            <p className="border-1 border-bottom border-primary"></p>
            <form className="form">
              <div className="row">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="email" className="form-label fw-medium">
                    Email:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your registered email"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 d-flex align-items-center offset-lg-3 mt-4">
                  <button className="btn btn-primary">Send Reset Link</button>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <a href="/login" className="link-primary">
                  Login?
                </a>
                <span>
                  Don't have an account?
                  <a href="/register" className="link-primary">
                    Register
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
