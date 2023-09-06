import HttpService from "../../../../config/http.service";

class BrandService extends HttpService {
  createBrand = async (data) => {
    try {
      let response = await this.postRequest("/v1/brands", data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getBrandForHomePage = async () => {
    try {
      let response = await this.getRequest("/v1/brands/home");
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllAdminBrand = async (perPage = 10, page = 1) => {
    try {
      let response = await this.getRequest(
        `/v1/brands?perPage=${perPage}&page=${page}`,
        { auth: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteBrand = async (id) => {
    try {
      let response = await this.deleteRequest(`/v1/brands/${id}`, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  updateBrand = async (data, id) => {
    try {
      let response = await this.putRequest(`/v1/brands/${id}`, data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  getBrandById = async (id) => {
    try {
      let response = await this.getRequest(`/v1/brands/${id}`, { auth: true });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default BrandService;
