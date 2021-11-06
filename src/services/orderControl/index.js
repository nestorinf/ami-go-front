import HTTP from "../axios";

class OrderControlService {
  path = "order-control";

  all() {
    return HTTP.get(`${this.path}`);
  }
  
  getById(data) {
      return HTTP.get(`${this.path}/` + data['type'] +`/`+data['id'])
  }

  update(data) {
      return HTTP.put(`${this.path}/` + data['type'] +`/`+data['id']+`/`+data['status'])
  }

}
export default new OrderControlService();
