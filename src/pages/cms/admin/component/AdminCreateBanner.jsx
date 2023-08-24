import React from "react";

export const AdminCreateBanner = () => {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-8">
          <h2 className="text-center mt-2 mb-3">Create Banner</h2>
          <p className="border-bottom border-1 border-primary"></p>

          <form className="form">
            <div className="row">
              <div className="col-lg-3 d-flex align-items-center">
                <label for="name" className="form-label fw-medium">
                  Title:
                </label>
              </div>

              <div className="col-lg-9">
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter title"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-3 d-flex align-items-center">
                <label for="email" className="form-label fw-medium">
                  URL:
                </label>
              </div>

              <div className="col-lg-9">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter link"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-3 d-flex align-items-center">
                <label for="role" className="form-label fw-medium">
                  Status:
                </label>
              </div>

              <div className="col-lg-9">
                <select className="form-select" name="status">
                  <option value="customer">Active</option>
                  <option value="seller">Inactive</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-3 d-flex align-items-center">
                <label for="formFile" className="form-label fw-medium">
                  Image:
                </label>
              </div>

              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="image"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
                <button className="btn btn-primary">Register</button>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-between">
              <span>
                Already have an account?
                <a href="/login" className="link-primary">
                  Login
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
