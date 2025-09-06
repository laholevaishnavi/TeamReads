import http from './http'


export const apiCreateTeam = (payload) => http.post('/teams', payload)
export const apiJoinTeam = (payload) => http.post('/teams/join', payload)
export const apiGetTeam = (id) => http.get(`/teams/${id}`)
// Optional convenience to list a user's teams IF you added backend endpoint
export const apiGetMyTeams = (userId) => http.get(`/teams/user/${userId}`)