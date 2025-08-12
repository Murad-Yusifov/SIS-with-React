import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'

export default function NavBar({ user, setUser }) {
  const nav = useNavigate()
  const handleLogout = () => {
    logout()
    setUser(null)
    nav('/login')
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold">SIS</Link>
        <Link to="/students" className="text-sm">Tələbələr</Link>
        <Link to="/courses" className="text-sm">Dərslər</Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">{user.first_name} {user.last_name}</span>
            <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Çıxış</button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 bg-blue-500 text-white rounded">Daxil ol</Link>
        )}
      </div>
    </nav>
  )
}