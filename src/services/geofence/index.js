import HTTP from "../axios";

class GeofenceService {
  path = "geofences";
  pathGeofenceByDepartmentMunicipality =
    "geofences_by_departments_municipalities";
  all() {
    return HTTP.get(`${this.path}`);
  }

  create(data) {
    return HTTP.post(`${this.path}`, data);
  }

  getById(id) {
    return HTTP.get(`${this.path}/` + id);
  }

  allGeofenceByDepartmentMunicipality(department_id, municipality_id) {
    return HTTP.get(
      `${this.pathGeofenceByDepartmentMunicipality}/` +
        department_id +
        `/` +
        municipality_id
    );
  }

  update(data) {
    return HTTP.put(`${this.path}/` + data.id, data);
  }

  remove(id) {
    return HTTP.delete(`${this.path}/` + id);
  }
}
export default new GeofenceService();
