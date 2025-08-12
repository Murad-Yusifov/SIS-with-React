import React, { useState } from 'react'
import { register } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', role: 'student' })
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const change = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    try {
      await register(form)
      nav('/login')
    } catch (error) {
      setErr(error?.response?.data?.message || 'Xəta')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Qeydiyyat</h2>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <input placeholder="Ad" value={form.first_name} onChange={change('first_name')} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Soyad" value={form.last_name} onChange={change('last_name')} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Email" value={form.email} onChange={change('email')} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Şifrə" type="password" value={form.password} onChange={change('password')} className="w-full p-2 border rounded mb-2" />
        <select value={form.role} onChange={change('role')} className="w-full p-2 border rounded mb-2">
          <option value="student">Tələbə</option>
          <option value="teacher">Müəllim</option>
        </select>
        <button className="w-full mt-2 bg-green-600 text-white py-2 rounded">Qeydiyyat</button>
      </form>
    </div>
  )
}
