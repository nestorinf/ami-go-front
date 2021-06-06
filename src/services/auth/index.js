import HTTP from '../axios'

class AuthService {
    path = 'auth'
    login(data) {
        return HTTP.post(`${this.path}/login`, data, { cache: false })
    }

    logout() {
        return HTTP.get(`${this.path}/logout`, { cache: false })
    }
    me() {
        return HTTP.get(`${this.path}/me`)
    }
}
export default new AuthService()