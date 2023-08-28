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
      this._headers = {
        ...this._headers,
        Authorization: "Bearer ",
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
}

export default HttpService;
