import React from 'react'

export default function Dashboard({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Salam, {user.first_name}. Rolun: {user.role}</p>
      {/* add widgets: recent announcements, quick links */}
    </div>
  )
}

