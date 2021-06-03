import axios from 'axios';

const HTTP = axios.create({
    baseURL: process.env.VUE_APP_URL_API + `/api/`,
    headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
    }
})


const token = localStorage.getItem('token')

const bearerInterceptor = (config) => {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
}
HTTP.interceptors.request.use(bearerInterceptor)

export default HTTP