import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/auth'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(null)
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      nav('/')
    } catch (error) {
      setErr(error?.response?.data?.message || 'Xəta baş verdi')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Daxil ol</h2>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <label className="block">Email<input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded mt-1" /></label>
        <label className="block mt-3">Şifrə<input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded mt-1" /></label>
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded">Daxil ol</button>
        <p className="mt-3 text-sm">Hesabın yoxdur? <Link to="/register" className="text-blue-600">Qeydiyyat</Link></p>
      </form>
    </div>
  )
}