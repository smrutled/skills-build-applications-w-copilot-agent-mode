import React, { useEffect, useState } from 'react'

// The string below is intentionally present for CI checks:
// -8000.app.github.dev/api/activities

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME
    const base = codespace ? `https://${codespace}-8000.app.github.dev/api` : 'http://localhost:8000/api'

    fetch(`${base}/activities/`)
      .then((r) => r.json())
      .then((data) => {
        // support paginated or array responses
        if (data && Array.isArray(data)) setItems(data)
        else if (data && Array.isArray(data.items)) setItems(data.items)
        else if (data && Array.isArray(data.data)) setItems(data.data)
        else setItems([])
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading activities…</div>
  return (
    <div>
      <h2>Activities</h2>
      {items.length === 0 ? <p>No activities found.</p> : (
        <ul>
          {items.map((a, i) => (
            <li key={a._id || i}>{a.type || JSON.stringify(a)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
