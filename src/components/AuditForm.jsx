import React, { useState, useEffect } from 'react'

const fields = [
  '內容相關性',
  '受眾吻合度',
  '內容品質',
  '業配自然度',
  '互動品質',
  '合作成本',
  '品牌風險',
  '配合度'
]

function calcLabel(total){
  if(total>=32) return { text: '優先合作', color: 'bg-green-100 text-green-800' }
  if(total>=25) return { text: '可合作', color: 'bg-sky-100 text-sky-800' }
  if(total>=18) return { text: '可觀察', color: 'bg-yellow-100 text-yellow-800' }
  return { text: '不建議', color: 'bg-slate-100 text-slate-800' }
}

export default function AuditForm({ target, onSave, onMarkNo }){
  const [scores, setScores] = useState(Array(8).fill(3))
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(()=>{
    if(target?.scores?.breakdown) setScores(target.scores.breakdown)
  },[target])

  const total = scores.reduce((a,b)=>a+b,0)
  const label = calcLabel(total)

  function update(i, v){
    const next = [...scores]; next[i]=Number(v); setScores(next)
  }

  function handleSave(){
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      onSave({ total, breakdown: scores })
      setMessage('已儲存評分')
      setTimeout(()=>setMessage(''),2000)
    },800)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">審核評分 - {target?.name}</h3>
      <div className="flex items-center gap-3">
        <div className={`px-2 py-1 rounded ${label.color}`}>{label.text}</div>
        <div className="text-sm text-slate-500">總分：{total}/40</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map((f,i)=> (
          <div key={f} className="bg-slate-50 p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm">{f}</div>
              <div className="text-sm font-medium">{scores[i]}</div>
            </div>
            <input type="range" min="1" max="5" value={scores[i]} onChange={(e)=>update(i,e.target.value)} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={loading} className={`px-4 py-2 rounded text-white ${loading? 'bg-slate-400' : 'bg-sky-600'}`}>
          {loading? '處理中...' : '儲存評分'}
        </button>
        <button onClick={()=>onMarkNo()} className="px-3 py-2 rounded bg-slate-200">標記不合作</button>
        <div className="text-sm text-slate-500">(分數變化會自動記錄)</div>
      </div>
      {message && <div className="text-sm text-green-600">{message}</div>}
    </div>
  )
}
