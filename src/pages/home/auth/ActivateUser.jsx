import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthServiceObj from "./auth.service";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export const ActivateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(true);
  const [details, setDetails] = useState();
  const params = useParams();
  const { token } = params;
  const { register, handleSubmit, watch, formState } = useForm();
  const password = watch("password");
  const { errors } = formState;

  const verifyToken = async () => {
    try {
      let response = await AuthServiceObj.verifyActivationToken(token);
      setDetails(response.data);
    } catch (error) {
      toast.error(error?.data?.msg);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  const handleSetPassword = async (data) => {
    // console.log(data);
    try {
      setPasswordLoading(true);
      let response = await AuthServiceObj.setPassword(data, token);

      toast.success("Your password has been successfully set. Please login");
      navigate("/login");
      console.log(response);
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      {loading ? (
        <>
          <div className="container nav-margin">Loading...</div>
        </>
      ) : (
        <>
          <div className="container-fluid mt-5 mb-5 nav-margin">
            <div className="row">
              <div className="col-md-4 offset-md-4 col-sm-10 offset-sm-1 mt-3 p-4 rounded-4 shadow-lg bg-secondary-subtle">
                <h2 className="text-center">Reset Password</h2>
                <p className="border-1 border-bottom border-primary"></p>
                <form
                  className="form"
                  onSubmit={handleSubmit(handleSetPassword)}
                >
                  <div className="row">
                    <div className="col-lg-4 d-flex align-items-center">
                      <label
                        htmlFor="password"
                        className="form-label fw-medium"
                      >
                        Password:
                      </label>
                    </div>

                    <div className="col-lg-8">
                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required.",
                          minLength: {
                            value: 8,
                            message: "Password must be atleast 8 characters.",
                          },
                        })}
                        className="form-control"
                        placeholder="New Password"
                      />
                      <div className="text-danger mt-2">
                        {errors && errors?.password?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-4 d-flex align-items-center">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label fw-medium"
                      >
                        Re-Password:
                      </label>
                    </div>

                    <div className="col-lg-8">
                      <input
                        type="password"
                        {...register("confirmPassword", {
                          required: "Re-Password is required.",
                          validate: (fieldValue) => {
                            return (
                              fieldValue === password ||
                              "Passwords do not match"
                            );
                          },
                        })}
                        className="form-control"
                        placeholder="Re-New Password"
                      />
                      <div className="text-danger mt-2">
                        {errors && errors?.confirmPassword?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 d-flex align-items-center offset-lg-4 mt-4">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
