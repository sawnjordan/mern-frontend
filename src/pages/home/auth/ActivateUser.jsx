import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthServiceObj from "./auth.service";
import { toast } from "react-toastify";

export const ActivateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const params = useParams();
  const verifyToken = async () => {
    try {
      let response = await AuthServiceObj.verifyActivationToken(params.token);
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
                <form className="form">
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
                        name="password"
                        className="form-control"
                        placeholder="New Password"
                      />
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
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Re-New Password"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 d-flex align-items-center offset-lg-4 mt-4">
                      <button className="btn btn-primary">Reset</button>
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
