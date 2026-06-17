'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BiddingCard } from '@/components/bidding/BiddingCard'
import { SkeletonCard } from '@/components/ui/SkeletonRow'
import { NeonButton } from '@/components/ui/NeonButton'
import { GlassCard } from '@/components/ui/GlassCard'
import { ChevronLeft, ChevronRight, Filter, Search, SlidersHorizontal, X } from 'lucide-react'

const PORTALS = [
  { label: 'Todos', value: '' },
  { label: 'PNCP', value: 'PNCP' },
]

const STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

// Valores reais presentes no banco (PNCP)
const MODALITIES = [
  { label: 'Todas', value: '' },
  { label: 'Dispensa', value: 'Dispensa' },
  { label: 'Pregao Eletronico', value: 'Pregao' },
  { label: 'Concorrencia', value: 'Concorrencia' },
  { label: 'Credenciamento', value: 'Credenciamento' },
  { label: 'Tomada de Precos', value: 'Tomada' },
]

const PAGE_SIZE = 12

interface Bidding {
  id: string
  title: string
  organ: string
  state: string | null
  city: string | null
  modality: string
  estimatedValue: number | null
  openingDate: string | null
  closingDate: string | null
  status: string
  portal: { name: string; type: string }
}

interface Filters {
  search: string
  portal: string
  states: string[]
  modality: string
  minValue: string
  page: number
}

function parseStates(value: string | null): string[] {
  if (!value) return []
  return Array.from(
    new Set(
      value
        .split(',')
        .map((s) => s.trim().toUpperCase())
        .filter((s) => STATES.includes(s))
    )
  )
}

/** Le os filtros aplicados a partir da query string (fonte da verdade). */
function filtersFromParams(sp: URLSearchParams): Filters {
  return {
    search: sp.get('search') ?? '',
    portal: sp.get('portal') ?? '',
    states: parseStates(sp.get('states')),
    modality: sp.get('modality') ?? '',
    minValue: sp.get('minValue') ?? '',
    page: Number(sp.get('page')) || 1,
  }
}

function LoadingGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

function OpportunitiesContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const qs = searchParams.toString()

  // Rascunho dos campos (a busca so e aplicada ao clicar "Buscar" / paginar)
  const [search, setSearch] = useState('')
  const [portal, setPortal] = useState('')
  const [states, setStates] = useState<string[]>([])
  const [modality, setModality] = useState('')
  const [minValue, setMinValue] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [biddings, setBiddings] = useState<Bidding[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [savingId, setSavingId] = useState<string | null>(null)

  const fetchBiddings = useCallback(async (f: Filters) => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(f.page), limit: String(PAGE_SIZE), onlyActive: 'true' })
    if (f.search) params.set('search', f.search)
    if (f.portal) params.set('portal', f.portal)
    if (f.states.length) params.set('states', f.states.join(','))
    if (f.modality) params.set('modality', f.modality)
    if (f.minValue) params.set('minValue', f.minValue)

    try {
      const res = await fetch(`/api/biddings?${params}`)
      const json = await res.json()
      setBiddings(json.data ?? [])
      setTotal(json.total ?? 0)
      setTotalPages(json.totalPages ?? 1)
    } catch {
      setBiddings([])
      setTotal(0)
      setTotalPages(1)
    }
    setLoading(false)
  }, [])

  // A URL e a fonte da verdade: ao montar, voltar/avancar (back/forward) ou
  // dar refresh, reidrata os campos e refaz a busca a partir da query string.
  useEffect(() => {
    const f = filtersFromParams(new URLSearchParams(qs))
    setSearch(f.search)
    setPortal(f.portal)
    setStates(f.states)
    setModality(f.modality)
    setMinValue(f.minValue)
    setPage(f.page)
    fetchBiddings(f)
  }, [qs, fetchBiddings])

  /** Grava os filtros na URL; o efeito acima reage e dispara a busca. */
  function applyToUrl(overrides: Partial<Filters>) {
    const f: Filters = { search, portal, states, modality, minValue, page, ...overrides }
    const params = new URLSearchParams()
    if (f.search) params.set('search', f.search)
    if (f.portal) params.set('portal', f.portal)
    if (f.states.length) params.set('states', f.states.join(','))
    if (f.modality) params.set('modality', f.modality)
    if (f.minValue) params.set('minValue', f.minValue)
    if (f.page > 1) params.set('page', String(f.page))
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  function handleSearch() {
    applyToUrl({ page: 1 })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  function toggleState(uf: string) {
    setStates((prev) => (prev.includes(uf) ? prev.filter((s) => s !== uf) : [...prev, uf]))
  }

  function clearFilters() {
    setSearch('')
    setPortal('')
    setStates([])
    setModality('')
    setMinValue('')
    router.replace(pathname, { scroll: false })
  }

  async function handleSave(id: string) {
    setSavingId(id)
    try {
      await fetch(`/api/biddings/${id}/save`, { method: 'POST' })
    } catch {}
    setSavingId(null)
  }

  function handlePageChange(newPage: number) {
    applyToUrl({ page: newPage })
  }

  const hasActiveFilters = Boolean(search || portal || states.length || modality || minValue)

  function portalDisplay(b: Bidding) {
    return b.portal?.name ?? b.portal?.type ?? '-'
  }

  return (
    <div className="space-y-6">
      {/* Search + filter bar */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar por titulo, orgao, cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input-neon w-full rounded-xl pl-9 pr-4 py-2.5 text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                showFilters || hasActiveFilters ? 'border-neon/40 text-neon bg-neon/10' : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <SlidersHorizontal size={15} />
              Filtros
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-neon text-black text-[10px] font-black rounded-full flex items-center justify-center">!</span>
              )}
            </button>
            <NeonButton onClick={handleSearch} loading={loading}>
              <Filter size={15} />
              <span className="ml-1.5">Buscar</span>
            </NeonButton>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Portal</label>
                <select value={portal} onChange={(e) => setPortal(e.target.value)}
                  className="input-neon w-full rounded-xl px-3 py-2 text-sm appearance-none cursor-pointer">
                  {PORTALS.map((p) => (
                    <option key={p.value} value={p.value} className="bg-gray-900">{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Modalidade</label>
                <select value={modality} onChange={(e) => setModality(e.target.value)}
                  className="input-neon w-full rounded-xl px-3 py-2 text-sm appearance-none cursor-pointer">
                  {MODALITIES.map((m) => (
                    <option key={m.value} value={m.value} className="bg-gray-900">{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Valor minimo (R$)</label>
                <input
                  type="number"
                  placeholder="Ex: 50000"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  className="input-neon w-full rounded-xl px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Estados (selecao multipla via chips) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-slate-500">
                  Estados {states.length > 0 && <span className="text-neon">({states.length} selecionado{states.length !== 1 ? 's' : ''})</span>}
                </label>
                {states.length > 0 && (
                  <button onClick={() => setStates([])} className="text-[11px] text-slate-500 hover:text-red-400 transition-colors">
                    Limpar estados
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STATES.map((uf) => {
                  const active = states.includes(uf)
                  return (
                    <button
                      key={uf}
                      type="button"
                      onClick={() => toggleState(uf)}
                      aria-pressed={active}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        active
                          ? 'bg-neon text-black'
                          : 'border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      {uf}
                    </button>
                  )
                })}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-end">
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors">
                  <X size={13} /> Limpar filtros
                </button>
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">
          {loading ? 'Buscando editais...' : (
            <>
              <span className="text-white font-semibold">{total}</span> edital{total !== 1 ? 'is' : ''} encontrado{total !== 1 ? 's' : ''}
              {hasActiveFilters && <span className="text-neon ml-1">(filtrado{total !== 1 ? 's' : ''})</span>}
            </>
          )}
        </p>
        <p className="text-slate-600 text-xs">Fonte: PNCP</p>
      </div>

      {/* Results grid */}
      {loading ? (
        <LoadingGrid />
      ) : biddings.length === 0 ? (
        <GlassCard className="p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-slate-600" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Nenhum edital encontrado</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            {total === 0 && !hasActiveFilters
              ? 'Va em Admin > Integracoes e clique "Sincronizar Agora" no PNCP para carregar editais.'
              : 'Tente ajustar os filtros ou usar termos de busca diferentes.'}
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-neon text-sm hover:text-neon/80 transition-colors">
              Limpar todos os filtros
            </button>
          )}
        </GlassCard>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {biddings.map((b) => (
            <BiddingCard
              key={b.id}
              id={b.id}
              title={b.title}
              organ={b.organ}
              state={b.state ?? undefined}
              city={b.city ?? undefined}
              modality={b.modality}
              estimatedValue={b.estimatedValue ?? undefined}
              openingDate={b.openingDate ?? undefined}
              closingDate={b.closingDate ?? undefined}
              portal={portalDisplay(b)}
              status={b.status}
              onView={(id) => router.push(`/dashboard/bidding/${id}`)}
              onSave={(id) => handleSave(id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-slate-500 text-sm">Pagina {page} de {totalPages}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                const p = i + 1
                return (
                  <button key={p} onClick={() => handlePageChange(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                      page === p ? 'bg-neon text-black' : 'border border-white/10 text-slate-500 hover:text-white hover:border-white/20'
                    }`}>
                    {p}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
            >
              Proxima <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<LoadingGrid />}>
      <OpportunitiesContent />
    </Suspense>
  )
}
