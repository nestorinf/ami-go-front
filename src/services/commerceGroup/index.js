import HTTP from "../axios";

class CommerceGroupService {
    path = "restaurant-commerce-groups";
    all() {
        return HTTP.get(`${this.path}/commerce`);
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
export default new CommerceGroupService();