import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  // const [credentials, setCredentials] = useState({
  //   email: null,
  //   password: null,
  // });

  // const [error, setError] = useState();

  // const handleChange = (e) => {
  //   let { name, value } = e.target;
  //   setCredentials({
  //     ...credentials,
  //     [name]: value,
  //   });

  //   let msg = handleValidation(value, name);

  //   setError({ ...error, [name]: msg });
  // };

  // const handleValidation = (value, field) => {
  //   let msg = null;
  //   switch (field) {
  //     case "email":
  //       msg = !value ? "Email is required" : "";
  //       break;
  //     case "password":
  //       msg = !value ? "Password is required" : "";
  //       break;
  //   }
  //   return msg;
  // };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleLogin = async (data) => {
    try {
      let response = await axios.post(
        "http://localhost:3005/api/v1/auth/login",
        data,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid mt-5 mb-5 nav-margin">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-10 offset-sm-1 mt-3 p-4 rounded-4 shadow-lg bg-secondary-subtle">
            <h2 className="text-center">Login</h2>
            <p className="border-1 border-bottom border-primary"></p>
            <form
              className="form"
              onSubmit={handleSubmit(handleLogin)}
              noValidate
            >
              <div className="row">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="email" className="form-label fw-medium">
                    Email:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="email"
                    {...register("email", { required: "Email is required." })}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <div className="text-danger mt-2">
                    {errors && errors?.email?.message}
                  </div>
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
                    {...register("password", {
                      required: "Password is required.",
                    })}
                    className="form-control"
                    placeholder="Password"
                  />
                  <div className="text-danger mt-2">
                    {errors && errors?.password?.message}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 d-flex align-items-center offset-lg-3 mt-4">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                  {/* <Button $primary>Login</Button> */}
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <Link to="/forgot-password" className="link-primary">
                  Forgot Password?
                </Link>
                <span>
                  Don't have an account?
                  <a href="/register" className="ms-2 link-primary">
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
