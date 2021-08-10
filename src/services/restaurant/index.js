import HTTP from '../axios'

class RestaurantService {
    path = 'restaurants'
    all() {
        return HTTP.get(`${this.path}`)
    }

    create(data) {
        return HTTP.post(`${this.path}`, data);
    }

    getById(id) {
        return HTTP.get(`${this.path}/` + id);
    }

    update({ payload, id }) {
        return HTTP.post(`${this.path}/` + id, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json'
            }
        });
    }

    remove(id) {
        return HTTP.delete(`${this.path}/` + id)
    }


}
export default new RestaurantService()