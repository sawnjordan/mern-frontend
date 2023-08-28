import axios from "axios";

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
    //TODO: Hanlde errors
    return reject?.response;
  }
);

export default axiosInstance;
