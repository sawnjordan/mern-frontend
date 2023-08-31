import HttpService from "../../../config/http.service";

class BannerService extends HttpService {
  getBannerForHomePage = async () => {
    try {
      let response = await this.getRequest("/v1/banner/home");
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const BannerServiceObj = new BannerService();
export default BannerServiceObj;
