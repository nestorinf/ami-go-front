import HTTP from "../axios";

class ProductClassificationService {
  path = "product-classifications";
  all(type_commerce) {
    return HTTP.get(`${this.path}`+'?type='+type_commerce)
  }
   allReferenceSize() {
    return HTTP.get(`${this.path}/reference-list-size`);
  }
  create(data) {
    return HTTP.post(`${this.path}`, data);
  }
  getById(id) {
    return HTTP.get(`${this.path}/` + id);
  }

  update(data) {
    return HTTP.put(`${this.path}/` + data.id, data);
  }

  remove(id) {
    return HTTP.delete(`${this.path}/` + id);
  }
}
export default new ProductClassificationService();
