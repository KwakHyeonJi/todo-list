import axios from 'axios'

const client = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
})

client.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.message)
)

export default client
