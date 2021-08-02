import HTTP from '../axios'

class ProductBatchesDetailService {
    path = 'product-batches-detail'
    
    // all(id_bacth) {
    //     return HTTP.get(`${this.path}`+'?type='+type)
    // }
      
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
export default new ProductBatchesDetailService()