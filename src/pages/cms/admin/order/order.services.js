import HttpService from "../../../../config/http.service";

class OrderService extends HttpService {
  getAllAdminOrder = async () => {
    try {
      let response = await this.getRequest(`/v1/orders`, { auth: true });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getMyOrders = async () => {
    try {
      let response = await this.getRequest("v1/orders/me", { auth: true });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default OrderService;
