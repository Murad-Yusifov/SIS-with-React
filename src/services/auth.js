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

/* src/hooks/useAuth.js */
import { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const payload = jwtDecode(token)
      // optional: check exp
    } catch (e) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }, [])

  return { user, setUser }
}