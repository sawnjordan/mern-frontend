import HttpService from "../../config/http.service";

class SellerService extends HttpService {
  getSellerProducts = async () => {
    try {
      let response = this.getRequest("/v1/seller/products", { auth: true });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const sellerServiceObj = new SellerService();
export default sellerServiceObj;
