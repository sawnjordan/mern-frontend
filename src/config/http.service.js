import axiosInstance from "./axios.config";

class HttpService {
  _headers = {};

  setHeaders = (config) => {
    if (config?.file) {
      this._headers = {
        "Content-Type": "multipart/form-data",
      };
    }
    if (config?.auth) {
      //TODO: token
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not logged in!!!");
      }
      this._headers = {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      };
    }
    if (config?.query) {
      this._headers = {
        ...this._headers,
        Params: config.query,
      };
    }
  };

  getRequest = async (url, config) => {
    try {
      this.setHeaders(config);
      let response = await axiosInstance.get(url, {
        headers: this._headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  postRequest = async (url, data = {}, config = {}) => {
    try {
      this.setHeaders(config);
      let response = await axiosInstance.post(url, data, {
        headers: this._headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  putRequest = async (url, data = {}, config = {}) => {
    try {
      this.setHeaders(config);
      let response = await axiosInstance.put(url, data, {
        headers: this._headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteRequest = async (url, config = {}) => {
    try {
      this.setHeaders(config);
      let response = await axiosInstance.delete(url, {
        headers: this._headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default HttpService;
