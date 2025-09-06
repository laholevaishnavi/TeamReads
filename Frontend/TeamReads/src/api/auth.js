import http from './http'


export const apiRegister = (payload) => http.post('http://localhost:5000/signup', payload)
export const apiLogin = (payload) => http.post('/login', payload)