import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const RegisterPage = () => {
  const registerSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email().required("Email is required."),
    phone: Yup.string().required("Phone is required."),
    address: Yup.object({
      shipping: Yup.string().required("Shipping Address is required."),
      billing: Yup.string().required("Billing Address is required."),
    }),
    role: Yup.string().matches(/seller|customer/, "Invalid value."),
    image: Yup.string(),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors } = formState;

  const handleRegister = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="container-fluid mt-3 mb-5 nav-margin">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mt-3 p-4 rounded-4 shadow-lg bg-secondary-subtle">
            <h2 className="text-center">Register</h2>
            <p className="border-bottom border-1 border-primary"></p>

            <form
              className="form"
              onSubmit={handleSubmit(handleRegister)}
              noValidate
            >
              <div className="row">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="name" className="form-label fw-medium">
                    Name:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="name"
                    {...register("name", { required: "Name is required" })}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  <div className="text-danger mt-2">
                    {errors && errors.name?.message}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="email" className="form-label fw-medium">
                    Email:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <div className="text-danger mt-2">
                    {errors && errors.email?.message}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="phone" className="form-label fw-medium">
                    Phone:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    className="form-control"
                    placeholder="Phone Number"
                  />
                  <div className="text-danger mt-2">
                    {errors && errors.phone?.message}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label
                    htmlFor="shippingAddress"
                    className="form-label fw-medium"
                  >
                    Address 1:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="text"
                    {...register("address[shipping]")}
                    className="form-control"
                    placeholder="Shipping Address"
                  />
                  <div className="text-danger mt-2">
                    {errors && errors.address?.shipping?.message}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label
                    htmlFor="billingAddress"
                    className="form-label fw-medium"
                  >
                    Address 2:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    type="text"
                    name="address[billing]"
                    {...register("address[billing]")}
                    className="form-control"
                    placeholder="Billing Address"
                  />
                  <div className="text-danger mt-2">
                    {errors && errors.address?.billing?.message}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="role" className="form-label fw-medium">
                    Role:
                  </label>
                </div>

                <div className="col-lg-9">
                  <select
                    className="form-select"
                    name="role"
                    {...register("role", { required: "Role is required." })}
                  >
                    <option value="customer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                  <div className="text-danger mt-2">
                    {errors && errors.role?.message}
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-3 d-flex align-items-center">
                  <label htmlFor="formFile" className="form-label fw-medium">
                    Avatar:
                  </label>
                </div>

                <div className="col-lg-9">
                  <input
                    className="form-control"
                    {...register("image", {
                      required: "Image is required.",
                    })}
                    type="file"
                    id="formFile"
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
                  <a href="/login" className="ms-2 link-primary">
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
