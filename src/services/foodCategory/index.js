import HTTP from "../axios";

class FoodCategoryService {
  path = "food-category";
  all() {
    return HTTP.get(`${this.path}`);
  }

  create(data) {
    return HTTP.post(`${this.path}`, data);
  }

  getById(id) {
    return HTTP.get(`${this.path}/` + id);
  }
  getCategoryByRestaurant(id) {
    return HTTP.get(`${this.path}/restaurant/` + id);
  }

  update(data) {
    return HTTP.put(`${this.path}/` + data.id, data);
  }

  remove(id) {
    return HTTP.delete(`${this.path}/` + id);
  }
}
export default new FoodCategoryService();
