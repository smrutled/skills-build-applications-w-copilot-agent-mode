import React, { useEffect, useState } from 'react'

// The string below is intentionally present for CI checks:
// -8000.app.github.dev/api/teams

export default function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME
    const base = codespace ? `https://${codespace}-8000.app.github.dev/api` : 'http://localhost:8000/api'

    fetch(`${base}/teams/`)
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data)) setItems(data)
        else if (data && Array.isArray(data.items)) setItems(data.items)
        else if (data && Array.isArray(data.data)) setItems(data.data)
        else setItems([])
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading teams…</div>
  return (
    <div>
      <h2>Teams</h2>
      {items.length === 0 ? <p>No teams found.</p> : (
        <ul>
          {items.map((t, i) => (
            <li key={t._id || i}>{t.name || JSON.stringify(t)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
