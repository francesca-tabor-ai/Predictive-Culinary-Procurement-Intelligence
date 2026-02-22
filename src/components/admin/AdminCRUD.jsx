import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminCRUD({ entity }) {
  const { api } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [error, setError] = useState('')

  const path = `/api/${entity.key}`

  useEffect(() => {
    setLoading(true)
    api(path)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [entity.key])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Create failed')
      }
      const created = await res.json()
      setItems([created, ...items])
      setForm({})
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api(`${path}/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Update failed')
      }
      const updated = await res.json()
      setItems(items.map((i) => (i.id === editing.id ? updated : i)))
      setEditing(null)
      setForm({})
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    setError('')
    try {
      const res = await api(`${path}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setItems(items.filter((i) => i.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (item) => {
    setEditing(item)
    const cols = entity.columns || []
    const f = {}
    cols.forEach((c) => {
      if (item[c] !== undefined && c !== 'password_hash') f[c] = item[c]
    })
    setForm(f)
  }

  const displayColumns = entity.displayColumns || [...(entity.columns || [])]
  if (!entity.displayColumns && entity.skipColumns) {
    displayColumns.push(...Object.keys(items[0] || {}).filter((k) => !entity.skipColumns?.includes(k) && !displayColumns.includes(k)))
  }
  const cols = [...new Set(displayColumns)].filter((c) => c !== 'password_hash' && c !== 'password')

  if (loading) {
    return <div className="loading-spinner" style={{ margin: 'var(--space-8) auto' }} />
  }

  return (
    <div>
      <h2 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-2xl)' }}>{entity.label}</h2>

      {error && (
        <div
          style={{
            padding: 'var(--space-3)',
            background: 'rgba(220, 38, 38, 0.1)',
            color: '#b91c1c',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {error}
        </div>
      )}

      <div
        className="card card-micro"
        style={{
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
          background: 'var(--color-white)',
        }}
      >
        <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-3)' }}>
          {editing ? `Edit ${entity.label.slice(0, -1)}` : `Add ${entity.label.slice(0, -1)}`}
        </h3>
        <form onSubmit={editing ? handleUpdate : handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
            {(entity.columns || []).filter((c) => c !== 'password_hash').map((col) => {
    const isPassword = col === 'password'
    return (
              <div key={col}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', marginBottom: 'var(--space-1)' }}>
                  {col.replace(/_/g, ' ')}
                </label>
                <input
                  type={isPassword ? 'password' : col.includes('email') ? 'email' : 'text'}
                  value={form[col] ?? ''}
                  onChange={(e) => setForm({ ...form, [col]: e.target.value })}
                  placeholder={isPassword ? (editing ? 'New password (leave blank to keep)' : 'Required') : col}
                  style={{
                    width: '100%',
                    padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--color-grey-300)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )
            })}
          </div>
          <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
            <button
              type="submit"
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: 'var(--color-black)',
                color: 'var(--color-white)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => { setEditing(null); setForm({}) }}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'var(--color-grey-200)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div
        className="card card-micro"
        style={{ overflowX: 'auto', background: 'var(--color-white)' }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-grey-200)' }}>
              {cols.map((c) => (
                <th
                  key={c}
                  style={{
                    padding: 'var(--space-3)',
                    textAlign: 'left',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {c.replace(/_/g, ' ')}
                </th>
              ))}
              <th style={{ padding: 'var(--space-3)', width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--color-grey-100)' }}>
                {cols.map((c) => (
                  <td key={c} style={{ padding: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
                    {typeof row[c] === 'object' && row[c] !== null ? JSON.stringify(row[c]) : String(row[c] ?? '-')}
                  </td>
                ))}
                <td style={{ padding: 'var(--space-3)' }}>
                  <button
                    onClick={() => startEdit(row)}
                    style={{
                      marginRight: 'var(--space-2)',
                      padding: 'var(--space-1) var(--space-2)',
                      fontSize: 'var(--font-size-xs)',
                      cursor: 'pointer',
                      background: 'var(--color-grey-100)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    style={{
                      padding: 'var(--space-1) var(--space-2)',
                      fontSize: 'var(--font-size-xs)',
                      cursor: 'pointer',
                      background: 'rgba(220, 38, 38, 0.1)',
                      color: '#b91c1c',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No items yet. Create one above.
          </div>
        )}
      </div>
    </div>
  )
}
