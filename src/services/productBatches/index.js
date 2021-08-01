import HTTP from '../axios'

class ProductBatchesService {
    path = 'product-batches'
    
    all(type) {
        return HTTP.get(`${this.path}`+'?type='+type)
    }
      
    create(data) {
        return HTTP.post(`${this.path}`, data)
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
export default new ProductBatchesService()