import HTTP from '../axios'

class CommerceService {
    path = 'commerces'
    
    all(type) {
        return HTTP.get(`${this.path}`+'?type='+type)
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

    getProductsByIdCommerce(id) {
        return HTTP.get(`${this.path+'_products'}/` + id)
    }

    update({payload,id}) {
        return HTTP.post(`${this.path}/` + id, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json'
            }
        })
    }

    remove(id) {
        return HTTP.delete(`${this.path}/` + id)
    }


}
export default new CommerceService()