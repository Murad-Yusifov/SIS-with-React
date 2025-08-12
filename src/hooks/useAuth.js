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
