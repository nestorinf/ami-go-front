import HTTP from "../axios";

class OrderControlService {
  path = "order-control";

  all() {
    return HTTP.get(`${this.path}`);
  }
  
  allOrdersByCommerces() {
    return HTTP.get(`${this.path}/by_commerces`);
  }
  
  OrdersDataCommerceByID(data) {
    return HTTP.get(`${this.path}/by_commerces/` + data['type'] +`/`+data['id'])
}
  allDriver() {
    return HTTP.get(`${this.path}/driver`);
  }
  
  allDetailsDriver(id) {
    return HTTP.get(`${this.path}/driver/` + id);
  }
  
  getById(data) {
      return HTTP.get(`${this.path}/` + data['type'] +`/`+data['id'])
  }


  update(data) {
      return HTTP.put(`${this.path}/` + data['type'] +`/`+data['id']+`/`+data['status'])
  }

}
export default new OrderControlService();
