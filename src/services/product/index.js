import HTTP from '../axios'

class ProductService {
    path = 'products'

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

    update(data) {
        return HTTP.put(`${this.path}/` + data.id, data)
    }

    remove(id) {
        return HTTP.delete(`${this.path}/` + id)
    }


}
export default new ProductService()