import HttpService from "../../../config/http.service";

class ProductServices extends HttpService {
  addToWishlist = async (productId) => {
    try {
      let response = await this.putRequest(
        "/v1/user/wishlist",
        { productId },
        {
          auth: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  getWishlist = async () => {
    try {
      let response = await this.getRequest("/v1/user/wishlist", {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getUserOrder = async (orderId) => {
    try {
      let response = await this.getRequest(`/v1/orders/${orderId}`, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  updateUserOrder = async (orderId, data) => {
    try {
      let response = await this.putRequest(`/v1/orders/${orderId}`, data, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const userProdServiceObj = new ProductServices();
export default userProdServiceObj;
