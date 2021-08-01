import HTTP from '../axios'

class AttachmentService {
    path = 'attachments'
    remove(id) {
        return HTTP.delete(`${this.path}/` + id)
    }
}
export default new AttachmentService()