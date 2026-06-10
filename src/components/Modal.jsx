import React from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, title, children, onClose }){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md w-full max-w-2xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
