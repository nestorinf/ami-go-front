import HTTP from '../axios'

class CategoryService {
    path = 'categories'
    pathintern = 'categories_intern'
    pathinternbycommerce = 'categories_intern_by_commerce'
    all() {
        return HTTP.get(`${this.path}`)
    }
    allIntern() {
        return HTTP.get(`${this.pathintern}`)
    }

    allInternByCommerce(id) {
        return HTTP.get(`${this.pathinternbycommerce}/` + id)
    }

    create(data) {
        return HTTP.post(`${this.path}`, data)
    }

    getById(id) {
        return HTTP.get(`${this.path}/` + id)
    }

    update(data) {
        return HTTP.post(`${this.path}/` + data['id'], data)
    }

    remove(id) {
        return HTTP.delete(`${this.path}/` + id)
    }


}
export default new CategoryService()