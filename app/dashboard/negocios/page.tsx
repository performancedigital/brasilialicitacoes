'use client'

import { useState, useCallback } from 'react'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { GlassCard } from '@/components/ui/GlassCard'
import { TrendingUp, Zap, Award, Target } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function NegociosPage() {
  const [stats, setStats] = useState({ total: 0, avaliando: 0, encaminhado: 0, vencido: 0 })

  const handleStats = useCallback((s: typeof stats) => setStats(s), [])

  const statCards = [
    { label: 'Total em Disputa', value: stats.total, icon: Target, color: 'text-white' },
    { label: 'Avaliando', value: stats.avaliando, icon: Zap, color: 'text-neon' },
    { label: 'Encaminhados', value: stats.encaminhado, icon: TrendingUp, color: 'text-neon-purple' },
    { label: 'Ganhos', value: stats.vencido, icon: Award, color: 'text-green-400' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Quadro de Disputas</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie seus editais salvos no estilo Kanban</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <GlassCard key={s.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500 text-xs">{s.label}</p>
              <s.icon size={16} className={s.color} />
            </div>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Kanban */}
      <KanbanBoard onStatsChange={handleStats} />
    </div>
  )
}
