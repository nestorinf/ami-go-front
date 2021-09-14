import HTTP from "../axios";

class DeliveryCostService {
  path = "delivery-costs";
  all() {
    return HTTP.get(`${this.path}`);
  }

  create(data) {
    return HTTP.post(`${this.path}`, data);
  }

  getById(id) {
    return HTTP.get(`${this.path}/` + id);
  }

  //   getDeliveryCostByReferenceId(id) {
  //     return HTTP.get(`${this.path}/references/` + id);
  //   }

  update(data) {
    return HTTP.put(`${this.path}/` + data.id, data);
  }

  remove(id) {
    return HTTP.delete(`${this.path}/` + id);
  }
}
export default new DeliveryCostService();
