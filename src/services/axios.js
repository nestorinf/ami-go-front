import axios from 'axios';

export const HTTP = axios.create({
    baseURL: process.env.VUE_APP_URL_API + `/api/`,
    headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
    }
})

