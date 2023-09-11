import HttpService from "../../../../config/http.service";

class UserService extends HttpService {
  createUser = async (data) => {
    try {
      let response = await this.postRequest("/v1/user", data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getUserForHomePage = async () => {
    try {
      let response = await this.getRequest("/v1/user/home");
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllAdminUser = async (perPage = 10, page = 1) => {
    try {
      let response = await this.getRequest(
        `/v1/user?perPage=${perPage}&page=${page}`,
        { auth: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      let response = await this.deleteRequest(`/v1/user/${id}`, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (data, id) => {
    try {
      let response = await this.putRequest(`/v1/user/${id}`, data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      let response = await this.getRequest(`/v1/user/${id}`, { auth: true });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
