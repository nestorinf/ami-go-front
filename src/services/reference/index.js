import HTTP from "../axios";

class ReferenceService {
  path = "references";
  all() {
    return HTTP.get(`${this.path}`);
  }

  allTypeSizes() {
    return HTTP.get(`${this.path}`+'_type_sizes');
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
export default new ReferenceService();
