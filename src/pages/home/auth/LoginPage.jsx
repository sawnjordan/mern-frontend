import { Link } from "react-router-dom";
import { Button } from "../../../components/common/button.component";
import { useState } from "react";

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    console.log(credentials);
  };
  return (
    <>
      <div className="container-fluid mt-5 mb-5 nav-margin">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-10 offset-sm-1 mt-3 p-4 rounded-4 shadow-lg bg-secondary-subtle">
            <h2 className="text-center">Login</h2>
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
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="password" className="form-label fw-medium">
                    Password:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
                  <button className="btn btn-primary">Login</button>
                  {/* <Button $primary>Login</Button> */}
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <Link to="/forgot-password" className="link-primary">
                  Forgot Password?
                </Link>
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
