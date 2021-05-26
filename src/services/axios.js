import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `{process.env.BASE_URL_API}/api/`,
    headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
    }
})

export default HTTP