import React, { useState } from 'react'

export default function Performance({ items, onSave }){
  const [local, setLocal] = useState({})
  function update(id, key, v){ setLocal(prev=>({ ...prev, [id]: { ...(prev[id]||{}), [key]: v } })) }
  function apply(id){ onSave(id, local[id]||{}) }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">成效紀錄</h2>
      {items.map(it=> (
        <div key={it.id} className="p-3 border rounded grid grid-cols-1 md:grid-cols-4 gap-2">
          <div>
            <div className="font-medium">{it.name}</div>
            <div className="text-sm text-slate-500">{it.product}</div>
          </div>
          <input placeholder="曝光" onChange={e=>update(it.id,'impr',e.target.value)} className="border px-2 py-1 rounded" />
          <input placeholder="互動" onChange={e=>update(it.id,'eng',e.target.value)} className="border px-2 py-1 rounded" />
          <div className="flex gap-2">
            <input placeholder="成交金額" onChange={e=>update(it.id,'sales',e.target.value)} className="border px-2 py-1 rounded" />
            <button onClick={()=>apply(it.id)} className="px-3 py-1 bg-sky-600 text-white rounded">回填數據</button>
          </div>
        </div>
      ))}
    </div>
  )
}
