import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000/api',
})

export const getTasks = (search = '') => http.get('/tasks', { params: { search } })
export const createTask = (data) => http.post('/tasks', data)
export const toggleTask = (id) => http.patch(`/tasks/${id}/toggle`)
export const updateTask = (id, data) => http.put(`/tasks/${id}`, data)
export const deleteTask = (id) => http.delete(`/tasks/${id}`)