import HTTP from "../axios";

class GeofenceRestrictionService {
  path = "geofence-restrictions";
  pathGeofenceRestrictionsByGeofence = "geofence-restrictions-by-geofence";
  all() {
    return HTTP.get(`${this.path}`);
  }

  create(data) {
    return HTTP.post(`${this.path}`, data);
  }

  getById(id) {
    return HTTP.get(`${this.path}/` + id);
  }

  allGeofenceRestrictionsByGeofence(geofence_id) {
    return HTTP.get(
      `${this.pathGeofenceRestrictionsByGeofence}/` + geofence_id
    );
  }

  update(data) {
    return HTTP.put(`${this.path}/` + data.id, data);
  }

  remove(id) {
    return HTTP.delete(`${this.path}/` + id);
  }
}
export default new GeofenceRestrictionService();
