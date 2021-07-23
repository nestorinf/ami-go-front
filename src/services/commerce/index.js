import HTTP from '../axios'

class CommerceService {
    path = 'commerces'
    
    all() {
        return HTTP.get(`${this.path}`)
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