import HTTP from "../axios";

class FoodFeatureService {
  path = "food-feature";
  path_feature = "food-feature-food";
  
  all(id) {
    return HTTP.get(`${this.path_feature}/` + id);
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
export default new FoodFeatureService();
