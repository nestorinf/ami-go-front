import HTTP from "../axios";

class OrderControlService {
  path = "order-control";

  all() {
    return HTTP.get(`${this.path}`);
  }

}
export default new OrderControlService();
