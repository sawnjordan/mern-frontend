import HttpService from "../../../../config/http.service";

class CategoryService extends HttpService {
  createCategory = async (data) => {
    try {
      let response = await this.postRequest("/v1/category", data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getCategoryForHomePage = async () => {
    try {
      let response = await this.getRequest("/v1/category/home");
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllAdminCategory = async (perPage = 10, page = 1) => {
    try {
      let response = await this.getRequest(
        `/v1/category?perPage=${perPage}&page=${page}`,
        { auth: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteCategory = async (id) => {
    try {
      let response = await this.deleteRequest(`/v1/category/${id}`, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  updateCategory = async (data, id) => {
    try {
      let response = await this.putRequest(`/v1/category/${id}`, data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  getCategoryById = async (id) => {
    try {
      let response = await this.getRequest(`/v1/category/${id}`, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default CategoryService;
