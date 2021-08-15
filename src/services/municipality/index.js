import HTTP from "../axios";

class MunicipalityService {
  path = "municipalities";
  pathMunicipalityByDepartment = "municipalities_by_departments";
  all() {
    return HTTP.get(`${this.path}`);
  }

  create(data) {
    return HTTP.post(`${this.path}`, data);
  }

  getById(id) {
    return HTTP.get(`${this.path}/` + id);
  }

  allMunicipalityByDepartment(id) {
    return HTTP.get(`${this.pathMunicipalityByDepartment}/` + id);
  }

  update(data) {
    return HTTP.put(`${this.path}/` + data.id, data);
  }

  remove(id) {
    return HTTP.delete(`${this.path}/` + id);
  }
}
export default new MunicipalityService();
