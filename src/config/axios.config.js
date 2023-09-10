import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  //using npx
  // baseURL: process.env.REACT_APP_API_URL
  // using vite
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server timed out..",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (success) => {
    return success;
  },
  async (reject) => {
    if (reject.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const refreshToken = localStorage.getItem("refreshToken");
      // //TODO: API Call for refreshToken
      if (refreshToken) {
        try {
          let response = await axiosInstance.get("/v1/auth/refresh-token", {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          localStorage.removeItem("refreshToken");
          localStorage.setItem("token", response.data?.data?.accessToken);
          localStorage.setItem(
            "refreshToken",
            response.data?.data?.refreshToken
          );
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data?.userDetails)
          );
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.data}`;
          // console.log(response);
          window.location.href = `/${response.data.data?.userDetails.role}`;
        } catch (error) {
          toast.error("Please login again.");
          window.location.href = "/login";

          // Redirect to the login page or pe
        }
        // localStorage.removeItem("refreshToken");

        // window.location.href = "/login";
      } else {
        toast.error("Please login again.");
        window.location.href = "/login";
      }
      // console.log(reject);
      //TODO: Hanlde errors
      throw reject?.response;
    }
  }
);

export default axiosInstance;
