/* src/pages/Students.jsx */
import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.get('/students').then(res=>{
      if(mounted) setStudents(res.data)
    }).catch(()=>{}).finally(()=>mounted && setLoading(false))
    return ()=> mounted = false
  },[])

  if(loading) return <div className="p-6">Yüklənir...</div>

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Tələbə siyahısı</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Ad</th>
            <th className="py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} className="text-sm border-t">
              <td className="py-2">{s.id}</td>
              <td className="py-2">{s.first_name} {s.last_name}</td>
              <td className="py-2">{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}