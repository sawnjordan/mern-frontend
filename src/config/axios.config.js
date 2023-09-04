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
  (reject) => {
    if (reject.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // //TODO: API Call for refreshToken
      localStorage.removeItem("refreshToken");
      toast.error("Please login firstyubhnji.");
      // window.location.href = "/login";
      window.location.href = "/login";
    }
    console.log(reject);
    //TODO: Hanlde errors
    throw reject?.response;
  }
);

export default axiosInstance;
