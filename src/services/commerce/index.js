import HTTP from '../axios'

class CommerceService {
    path = 'commerces'
    
    all(type) {
        return HTTP.get(`${this.path}`+'?type='+type)
    }

    create(data) {
        return HTTP.post(`${this.path}`, data)
    }

    getById(id) {
        return HTTP.get(`${this.path}/` + id)
    }

    getProductsByIdCommerce(id) {
        return HTTP.get(`${this.path+'_products'}/` + id)
    }

    update(data) {
        return HTTP.put(`${this.path}/` + data.id, data)
    }

    remove(id) {
        return HTTP.delete(`${this.path}/` + id)
    }


}
export default new CommerceService()