import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

/* src/services/auth.js */
import api from './api'

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

export const register = async (payload) => {
  const res = await api.post('/auth/register', payload)
  return res.data
}

export const getProfile = async () => {
  const res = await api.get('/auth/profile')
  return res.data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}