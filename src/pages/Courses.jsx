import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Courses(){
  const [courses,setCourses] = useState([])
  useEffect(()=>{ api.get('/courses').then(r=>setCourses(r.data)).catch(()=>{}) },[])
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Dərslər</h2>
      <ul className="space-y-2">
        {courses.map(c=> (
          <li key={c.id} className="p-3 border rounded">{c.name} - müəllim: {c.teacher_name || '—'}</li>
        ))}
      </ul>
    </div>
  )
}