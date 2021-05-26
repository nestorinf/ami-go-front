import axios from './axios'

class AuthService {
    path = 'auth'
    login(data) {
        return axios.post(`${this.path}/login`, data)
    }

    me() {
        return axios.get(`${this.path}/me`)
    }
}
export default new AuthService()