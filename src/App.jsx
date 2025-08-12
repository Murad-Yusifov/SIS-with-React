import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Courses from './pages/Courses'

export default function App() {
  const auth = useAuth()
  const [user, setUser] = useState(auth.user)

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute roles={['admin', 'teacher']}>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div className="p-6">Səhifə tapılmadı</div>} />
        </Routes>
      </main>
    </div>
  )
}
