import React, { useState } from 'react'

export default function Tracking({ items, onUpdate }){
  const [local, setLocal] = useState({})
  function updateField(id, key, val){
    setLocal(prev=>({ ...prev, [id]: { ...(prev[id]||{}), [key]: val } }))
  }
  function apply(id){
    onUpdate(id, local[id]||{})
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">合作追蹤</h2>
      <div className="space-y-3">
        {items.filter(i=>['接洽合作','發布追蹤'].includes(i.status)).map(it=> (
          <div key={it.id} className="p-3 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="font-medium">{it.name} <span className="text-sm text-slate-500">{it.product}</span></div>
              <div className="text-sm text-slate-500">負責人：{it.owner}</div>
            </div>
            <div className="flex gap-2 items-center">
              <input placeholder="填寄送資料" value={(local[it.id]?.send)||''} onChange={e=>updateField(it.id,'send',e.target.value)} className="border px-2 py-1 rounded" />
              <input placeholder="發布連結" value={(local[it.id]?.link)||''} onChange={e=>updateField(it.id,'link',e.target.value)} className="border px-2 py-1 rounded" />
              <button onClick={()=>apply(it.id)} className="px-3 py-1 bg-sky-600 text-white rounded">回填</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
