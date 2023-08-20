export const RegisterPage = () => {
  return (
    <>
      <div className="container-fluid mt-3 mb-5 nav-margin">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mt-3 p-4 rounded-4 shadow-lg bg-secondary-subtle">
            <h2 className="text-center">Register</h2>
            <p className="border-bottom border-1 border-primary"></p>

            <form className="form">
              <div className="row">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="name" className="form-label fw-medium">
                    Name:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="email" className="form-label fw-medium">
                    Email:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="phone" className="form-label fw-medium">
                    Phone:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="shippingAddress" className="form-label fw-medium">
                    Address 1:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="text"
                    name="address[shipping]"
                    className="form-control"
                    placeholder="Shipping Address"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="billingAddress" className="form-label fw-medium">
                    Address 2:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="text"
                    name="address[billing]"
                    className="form-control"
                    placeholder="Billing Address"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="role" className="form-label fw-medium">
                    Role:
                  </label>
                </div>

                <div className="col-lg-9">
                  <select className="form-select" name="role">
                    <option value="customer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="password" className="form-label fw-medium">
                    Password:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label for="formFile" className="form-label fw-medium">
                    Avatar:
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
    </>
  );
};
