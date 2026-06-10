import React from 'react'
import { PlusCircle } from 'lucide-react'

export default function KOLTable({ data, onAdd, onStartAudit, onUpdate }){
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">名單總表</h2>
        <button onClick={onAdd} className="flex items-center gap-2 bg-sky-600 text-white px-3 py-2 rounded">
          <PlusCircle size={16} /> 新增 KOL / KOC
        </button>
      </div>
      <div className="overflow-x-auto bg-white border rounded">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-2">ID</th>
              <th>名字</th>
              <th>平台連結</th>
              <th>目前狀態</th>
              <th>負責人</th>
              <th>合作產品</th>
              <th className="p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map(k => (
              <tr key={k.id} className="border-t">
                <td className="p-2">{k.id}</td>
                <td>{k.name}</td>
                <td className="text-sky-600"><a href={k.link} target="_blank" rel="noreferrer">{k.platform}</a></td>
                <td>{k.status}</td>
                <td>{k.owner}</td>
                <td>{k.product}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button onClick={() => onStartAudit(k)} className="px-2 py-1 bg-emerald-500 text-white rounded text-sm">開始審核</button>
                    <button onClick={() => onUpdate(k)} className="px-2 py-1 bg-slate-200 rounded text-sm">更新狀態</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
