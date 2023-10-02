import HttpService from "../../../config/http.service";

class CartService extends HttpService {
  placeOrder = async (cart) => {
    try {
      let response = await this.postRequest("/v1/orders", cart, {
        auth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const CartServiceObj = new CartService();
export default CartServiceObj;
