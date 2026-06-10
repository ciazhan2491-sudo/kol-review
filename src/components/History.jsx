import React from 'react'

export default function History({ items }){
  return (
    <div>
      <h2 className="text-xl font-semibold">歷史紀錄</h2>
      <div className="space-y-2 mt-3">
        {items.map(it=> (
          <div key={it.id} className="p-3 border rounded">
            <div className="font-medium">{it.name} <span className="text-sm text-slate-500">{it.id}</span></div>
            <div className="text-sm mt-2">
              {it.history.length===0 ? <span className="text-slate-400">尚無紀錄</span> : (
                <ul className="list-disc ml-5">
                  {it.history.map((h,idx)=> <li key={idx}>{h}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
