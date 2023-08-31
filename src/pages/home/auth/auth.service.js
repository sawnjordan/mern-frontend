import HttpService from "../../../config/http.service";

class AuthService extends HttpService {
  login = async (credentials) => {
    try {
      let response = await this.postRequest("/v1/auth/login", credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  verifyActivationToken = async (token) => {
    try {
      let response = await this.getRequest(`/v1/auth/verify-token/${token}`);
      // console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      let response = await this.postRequest("/v1/auth/register", data, {
        file: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  setPassword = async (data, token) => {
    try {
      let response = await this.postRequest(
        `/v1/auth/password-reset/${token}`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  getLoggedInUser = async () => {
    try {
      let response = await this.getRequest("/v1/auth/me", { auth: true });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const AuthServiceObj = new AuthService();
export default AuthServiceObj;
