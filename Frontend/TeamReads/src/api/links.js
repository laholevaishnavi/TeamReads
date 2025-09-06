import http from './http'


export const apiAddLink = (payload) => http.post('/links', payload)
export const apiGetTeamLinks = (teamId) => http.get(`/links/${teamId}`)