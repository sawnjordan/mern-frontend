import HttpService from "../../../../config/http.service";

class ProductService extends HttpService {
  createProduct = async (data) => {
    try {
      let response = await this.postRequest("/v1/products", data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getProductForHomePage = async () => {
    try {
      let response = await this.getRequest("/v1/products/home");
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllAdminProduct = async (perPage = 10, page = 1) => {
    try {
      let response = await this.getRequest(
        `/v1/products?perPage=${perPage}&page=${page}`,
        { auth: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (id) => {
    try {
      let response = await this.deleteRequest(`/v1/products/${id}`, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  updateProduct = async (data, id) => {
    try {
      let response = await this.putRequest(`/v1/products/${id}`, data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  getProductById = async (id) => {
    try {
      let response = await this.getRequest(`/v1/products/${id}`, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default ProductService;
