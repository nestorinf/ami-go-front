import HTTP from '../axios'

class CategoryService {
    path = 'categories'
    pathintern = 'categories_intern'
    pathinternbycommerce = 'categories_intern_by_commerce'

    all(type) {
        return HTTP.get(`${this.path}`+'?type='+type)
    }

    allIntern(type) {
        return HTTP.get(`${this.pathintern}`+'?type='+type)
    }

    allInternByCommerce(id) {
        return HTTP.get(`${this.pathinternbycommerce}/` + id)
    }

    create(data) {
        return HTTP.post(`${this.path}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json'
            }
        })
    }

    
    getById(id) {
        return HTTP.get(`${this.path}/` + id)
    }

    
    
    update({payload,id}) {
        return HTTP.post(`${this.path}/` + id, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json'
            }
        })
    }


    update_old(data) {
        return HTTP.post(`${this.path}/` + data['id'], data)
    }

    remove(id) {
        return HTTP.delete(`${this.path}/` + id)
    }


}
export default new CategoryService()