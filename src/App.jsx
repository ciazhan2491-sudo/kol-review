import React, { useState } from 'react'
import Tabs from './components/Tabs'
import KOLTable from './components/KOLTable'
import Modal from './components/Modal'
import AuditForm from './components/AuditForm'
import Tracking from './components/Tracking'
import Performance from './components/Performance'
import History from './components/History'
import Toast from './components/Toast'
import { initialKols } from './data'
import { Plus } from 'lucide-react'

const tabNames = ['名單總表','審核評分','合作追蹤','成效紀錄','歷史紀錄']

export default function App(){
  const [active, setActive] = useState(tabNames[0])
  const [kols, setKols] = useState(initialKols)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState('')

  function addKOL(data){
    // generate id
    const idx = String(kols.length + 1).padStart(4,'0')
    const newItem = { ...data, id: `KOL-2026-${idx}`, scores: null, history: [`建立：${new Date().toLocaleString()}`] }
    setKols(prev=>[newItem, ...prev])
    setShowModal(false)
    setToast('已新增 KOL / KOC')
    setTimeout(()=>setToast(''),2000)
  }

  function startAudit(item){
    setEditing(item)
    setActive('審核評分')
  }

  function updateState(item){
    const next = prompt('輸入要更新的狀態（例如：接洽合作 / 發布追蹤 / 再開發）', item.status)
    if(next){
      setKols(prev=>prev.map(p=> p.id===item.id? { ...p, status: next, history: [...p.history, `狀態更新：${next} (${new Date().toLocaleString()})`] } : p))
      setToast('已更新狀態')
      setTimeout(()=>setToast(''),1500)
    }
  }

  function saveScores(payload){
    if(!editing) return
    setKols(prev=> prev.map(p=> p.id===editing.id? { ...p, scores: payload, status: '接洽合作', history: [...p.history, `審核評分：${payload.total} (${new Date().toLocaleString()})`] } : p))
    setToast('評分已儲存並標記為接洽合作')
    setTimeout(()=>setToast(''),2000)
  }

  function markNo(){
    if(!editing) return
    if(!confirm('確定要標記為不合作？此動作會紀錄於歷史紀錄。')) return
    setKols(prev=> prev.map(p=> p.id===editing.id? { ...p, status: '不合作', history: [...p.history, `標記不合作 (${new Date().toLocaleString()})`] } : p))
    setToast('已標記不合作')
    setEditing(null)
    setTimeout(()=>setToast(''),1500)
  }

  function updateTracking(id, payload){
    setKols(prev=> prev.map(p=> p.id===id? { ...p, history: [...p.history, `追蹤回填：${JSON.stringify(payload)} (${new Date().toLocaleString()})`], ...payload } : p))
    setToast('回填追蹤資料')
    setTimeout(()=>setToast(''),1500)
  }

  function savePerformance(id, payload){
    setKols(prev=> prev.map(p=> p.id===id? { ...p, history: [...p.history, `成效回填：${JSON.stringify(payload)} (${new Date().toLocaleString()})`], performance: payload } : p))
    setToast('已回填成效數據')
    setTimeout(()=>setToast(''),1500)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">KOL / KOC 審核管理 MVP</h1>
          <div className="text-sm text-slate-500">把合作流程從經驗化轉為可追蹤、可交接的流程</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-sky-700 text-white px-3 py-2 rounded" onClick={()=>setShowModal(true)}><Plus size={16}/> 新增名單</button>
        </div>
      </header>

      <Tabs tabs={tabNames} active={active} onChange={setActive} />

      <main className="mt-4">
        {active==='名單總表' && (
          <KOLTable data={kols} onAdd={()=>setShowModal(true)} onStartAudit={startAudit} onUpdate={updateState} />
        )}

        {active==='審核評分' && (
          <div className="bg-white p-4 rounded shadow">
            <AuditForm target={editing || kols[0]} onSave={saveScores} onMarkNo={markNo} />
          </div>
        )}

        {active==='合作追蹤' && (
          <Tracking items={kols} onUpdate={updateTracking} />
        )}

        {active==='成效紀錄' && (
          <Performance items={kols} onSave={savePerformance} />
        )}

        {active==='歷史紀錄' && (
          <History items={kols} />
        )}
      </main>

      <Modal open={showModal} title="新增 KOL / KOC" onClose={()=>setShowModal(false)}>
        <AddForm onCancel={()=>setShowModal(false)} onSubmit={addKOL} />
      </Modal>

      <Toast message={toast} />
    </div>
  )
}

function AddForm({ onCancel, onSubmit }){
  const [form, setForm] = useState({ name:'', platform:'', link:'', owner:'', product:'' })
  const [loading, setLoading] = useState(false)
  const requiredFilled = form.name && form.platform && form.link && form.owner && form.product

  function change(k,v){ setForm(prev=> ({ ...prev, [k]: v })) }
  function handleSubmit(){
    if(!requiredFilled) return
    setLoading(true)
    setTimeout(()=>{ setLoading(false); onSubmit(form); },800)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input placeholder="名字" value={form.name} onChange={e=>change('name',e.target.value)} className="border px-2 py-1 rounded" />
        <input placeholder="平台 (Instagram / YouTube)" value={form.platform} onChange={e=>change('platform',e.target.value)} className="border px-2 py-1 rounded" />
        <input placeholder="平台連結" value={form.link} onChange={e=>change('link',e.target.value)} className="border px-2 py-1 rounded col-span-2" />
        <input placeholder="負責人" value={form.owner} onChange={e=>change('owner',e.target.value)} className="border px-2 py-1 rounded" />
        <input placeholder="合作產品" value={form.product} onChange={e=>change('product',e.target.value)} className="border px-2 py-1 rounded" />
      </div>
      <div className="flex items-center gap-2">
        <button disabled={!requiredFilled || loading} onClick={handleSubmit} className={`px-4 py-2 rounded text-white ${(!requiredFilled||loading)?'bg-slate-400':'bg-sky-600'}`}>
          {loading? '處理中...' : '新增並建立名單'}
        </button>
        <button onClick={onCancel} className="px-3 py-2 rounded bg-slate-200">取消</button>
      </div>
      {!requiredFilled && <div className="text-sm text-red-600">請填寫所有必填欄位：平台連結、負責人、目前狀態、合作產品</div>}
    </div>
  )
}
