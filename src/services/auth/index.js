import { HTTP } from '../axios'

class AuthService {
    path = 'auth'
    login(data) {
        return HTTP.post(`${this.path}/login`, data)
    }

    logout(token) {
        return HTTP.get(`${this.path}/logout`, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
    }
    me() {
        return HTTP.get(`${this.path}/me`)
    }
}
export default new AuthService()