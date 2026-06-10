import React from 'react'

export default function Tabs({ tabs, active, onChange }){
  return (
    <div className="flex gap-2 border-b pb-2">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-3 py-1 rounded-t-md ${active===t? 'bg-sky-700 text-white' : 'text-slate-600 bg-transparent'}`}
        >{t}</button>
      ))}
    </div>
  )
}
