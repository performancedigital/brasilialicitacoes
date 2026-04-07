/**
 * fix-all-admin-sync.js
 * Resolve todos os problemas: admin refletindo no site, senha, etc.
 * Executar: node fix-all-admin-sync.js (a partir de SAAS Pregão)
 */
const fs = require('fs')
const p = s => `C:\\Users\\Helbert\\Documents\\Verdent\\barbeza2\\src\\${s}`

// ============================================================
// 1. ServicesSection.tsx — lê localStorage + botão orçamento noivo
// ============================================================
const servicesSectionContent = `import { Scissors, Smile, Sparkles, Crown, type LucideProps } from "lucide-react"
import { type ForwardRefExoticComponent, type RefAttributes } from "react"
import { SERVICES, BUSINESS } from "@/data/content"
import type { Service } from "@/types"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>
const ICONS: Record<string,LucideIcon> = { Scissors, Smile, Sparkles, Crown }

function loadServices(): Service[] {
  try {
    const s = localStorage.getItem('barbeza-services')
    return s ? (JSON.parse(s) as Service[]) : SERVICES
  } catch { return SERVICES }
}

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const services = loadServices()
  const waText = encodeURIComponent('Ol\u00e1! Gostaria de solicitar um or\u00e7amento para o Making Of do Noivo.')

  return (
    <section id="servicos" className="section-padding bg-natural">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">O que oferecemos</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Nossos Servi\u00e7os</h2>
          <GoldDivider icon="scissor" className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((sv, i) => {
            const Icon = ICONS[sv.icon] || Scissors
            return (
              <div key={sv.id} className="card-natural rounded-xl p-6 flex flex-col gap-4 relative"
                style={{ opacity:isVisible?1:0, transform:isVisible?"none":"translateY(30px)", transition:\`all 0.5s ease \${i*100}ms\` }}>
                {sv.featured && <span className="absolute top-4 right-4 bg-forest text-white text-[9px] font-raleway font-bold px-2 py-1 tracking-wider rounded">POPULAR</span>}
                {sv.premium && <span className="absolute top-4 right-4 border border-olive text-olive text-[9px] font-raleway font-bold px-2 py-1 tracking-wider rounded">PREMIUM</span>}
                <div className="w-12 h-12 rounded-full bg-forest/8 border border-forest/15 flex items-center justify-center">
                  <Icon size={20} className="text-forest"/>
                </div>
                <div className="flex-1">
                  <h3 className="font-raleway text-ink font-bold text-base tracking-wide mb-2">{sv.name}</h3>
                  <p className="font-inter text-sm text-ink-muted leading-relaxed">{sv.description}</p>
                </div>
                <div className="flex items-end justify-between border-t border-natural-border pt-4 mt-auto">
                  <span className="font-raleway text-2xl font-black text-forest">R\${sv.price}</span>
                  <span className="font-inter text-xs text-ink-dim">{sv.duration}</span>
                </div>
                {sv.premium ? (
                  <a href={\`https://wa.me/\${BUSINESS.whatsapp}?text=\${waText}\`} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" size="sm" className="w-full border-olive text-olive hover:bg-olive hover:text-white">SOLICITAR OR\u00c7AMENTO</Button>
                  </a>
                ) : (
                  <Button href={BUSINESS.inbarberUrl} target="_blank" variant="outline" size="sm" className="w-full">AGENDAR</Button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
`

// ============================================================
// 2. LocationSection.tsx — lê horas do localStorage
// ============================================================
const locationSectionContent = `import { MapPin, Clock, Phone, Instagram, MessageCircle } from "lucide-react"
import { BUSINESS, HOURS } from "@/data/content"
import type { BusinessHours } from "@/types"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

function loadHours(): BusinessHours {
  try {
    const s = localStorage.getItem('barbeza-hours')
    return s ? (JSON.parse(s) as BusinessHours) : HOURS
  } catch { return HOURS }
}

export function LocationSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const hours = loadHours()
  const entries = Object.values(hours)

  return (
    <section id="contato" className="section-padding bg-natural">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Como chegar</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Localiza\u00e7\u00e3o</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(61,90,61,0.12)] border border-natural-border aspect-[4/3]">
            <iframe
              src={BUSINESS.googleMapsUrl}
              className="w-full h-full border-0"
              title="Localiza\u00e7\u00e3o Barbeza"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="card-natural rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-forest"/>
                </div>
                <div>
                  <p className="font-raleway text-ink font-bold text-sm mb-1">Endere\u00e7o</p>
                  <p className="font-inter text-ink-muted text-sm leading-relaxed">{BUSINESS.fullAddress}</p>
                  <a href={BUSINESS.googleMapsLink} target="_blank" rel="noopener noreferrer"
                    className="font-inter text-xs text-forest hover:underline mt-1 inline-block">Ver no Google Maps \u2192</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-forest"/>
                </div>
                <div className="flex-1">
                  <p className="font-raleway text-ink font-bold text-sm mb-3">Hor\u00e1rio de Funcionamento</p>
                  <div className="space-y-1.5">
                    {entries.map(h => (
                      <div key={h.label} className="flex items-center justify-between text-xs">
                        <span className="font-inter text-ink-muted">{h.label}</span>
                        {h.active
                          ? <span className="font-raleway font-bold text-forest">{h.open} \u2013 {h.close}</span>
                          : <span className="font-inter text-ink-dim">Fechado</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a href={\`https://wa.me/\${BUSINESS.whatsapp}\`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 border-0 text-white">
                  <MessageCircle size={18} className="mr-2"/> WHATSAPP
                </Button>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={\`tel:\${BUSINESS.phone}\`}>
                  <Button variant="outline" size="sm" className="w-full"><Phone size={14} className="mr-2"/> Ligar</Button>
                </a>
                <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full"><Instagram size={14} className="mr-2"/> Instagram</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
`

// ============================================================
// 3. DashboardLogin.tsx — suporte a senha customizada + esqueceu senha
// ============================================================
const loginContent = `import { useState } from 'react'
import { Lock, Eye, EyeOff, KeyRound } from 'lucide-react'

const DEFAULT_PASSWORD = 'barbeza@2025'
const PWD_KEY = 'barbeza-pwd'

function getCurrentPassword() {
  return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD
}

interface Props {
  onAuth: () => void
}

export function DashboardLogin({ onAuth }: Props) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [resetDone, setResetDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === getCurrentPassword()) {
      localStorage.setItem('barbeza-admin-auth', '1')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleReset = () => {
    localStorage.removeItem(PWD_KEY)
    setResetDone(true)
    setInput('')
    setTimeout(() => setResetDone(false), 4000)
  }

  return (
    <div className="min-h-screen bg-natural-alt flex items-center justify-center px-4">
      <div className="glass-card rounded-xl p-10 w-full max-w-sm text-center shadow-lg">
        <div className="w-14 h-14 rounded-full border border-forest/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={22} className="text-forest" />
        </div>
        <h1 className="font-raleway text-forest text-lg tracking-widest mb-1">BARBEZA</h1>
        <p className="font-inter text-xs text-ink-muted mb-8 tracking-wider">PAINEL ADMINISTRATIVO</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Senha"
              autoFocus
              className={\`w-full bg-natural border rounded px-4 py-3 pr-11 font-inter text-sm text-ink placeholder-ink-muted/40 outline-none focus:border-forest transition-colors \${
                error ? 'border-red-500' : 'border-natural-border'
              }\`}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-forest transition-colors"
              tabIndex={-1}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="font-inter text-xs text-red-400">Senha incorreta. Tente novamente.</p>}
          {resetDone && (
            <p className="font-inter text-xs text-forest bg-forest/10 rounded px-3 py-2">
              Senha redefinida. Use: <strong>barbeza@2025</strong>
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-forest text-white font-raleway text-xs tracking-widest py-3 rounded hover:bg-forest-light transition-colors"
          >
            ENTRAR
          </button>
        </form>

        <button
          onClick={handleReset}
          className="mt-5 flex items-center gap-1.5 text-ink-muted/50 hover:text-forest text-[11px] font-inter mx-auto transition-colors"
        >
          <KeyRound size={12} /> Esqueceu a senha? Redefinir para o padr\u00e3o
        </button>

        <p className="font-inter text-[10px] text-ink-muted/30 mt-4">
          Barbeza &copy; {new Date().getFullYear()} &mdash; Acesso restrito
        </p>
      </div>
    </div>
  )
}
`

// ============================================================
// 4. SecurityManager.tsx — novo componente para trocar senha
// ============================================================
const securityManagerContent = `import { useState } from 'react'
import { Lock, Eye, EyeOff, Check, ShieldCheck } from 'lucide-react'

const DEFAULT_PASSWORD = 'barbeza@2025'
const PWD_KEY = 'barbeza-pwd'

function getCurrentPassword() {
  return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD
}

export function SecurityManager() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const hasCustomPwd = !!localStorage.getItem(PWD_KEY)

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (current !== getCurrentPassword()) {
      flash('err', 'Senha atual incorreta.')
      return
    }
    if (next.length < 6) {
      flash('err', 'Nova senha deve ter no m\u00ednimo 6 caracteres.')
      return
    }
    if (next !== confirm) {
      flash('err', 'As senhas n\u00e3o coincidem.')
      return
    }
    localStorage.setItem(PWD_KEY, next)
    flash('ok', 'Senha alterada com sucesso!')
    setCurrent('')
    setNext('')
    setConfirm('')
  }

  const handleReset = () => {
    localStorage.removeItem(PWD_KEY)
    flash('ok', 'Senha redefinida para o padr\u00e3o: barbeza@2025')
    setCurrent('')
    setNext('')
    setConfirm('')
  }

  return (
    <div className="max-w-md">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
          <ShieldCheck size={18} className="text-forest" />
        </div>
        <div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">SEGURAN\u00c7A</h2>
          <p className="font-inter text-xs text-ink-muted mt-0.5">
            {hasCustomPwd ? 'Senha personalizada ativa' : 'Usando senha padr\u00e3o'}
          </p>
        </div>
      </div>

      <form onSubmit={handleChange} className="glass-card rounded-xl p-6 flex flex-col gap-4">
        <h3 className="font-raleway text-ink text-sm tracking-wider">Alterar Senha</h3>

        {/* Senha atual */}
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Senha atual</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={current}
              onChange={e => setCurrent(e.target.value)}
              placeholder="Digite a senha atual"
              className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 pr-10 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
            />
            <button type="button" onClick={() => setShowCurrent(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-forest">
              {showCurrent ? <EyeOff size={15}/> : <Eye size={15}/>}
            </button>
          </div>
        </div>

        {/* Nova senha */}
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Nova senha</label>
          <div className="relative">
            <input
              type={showNext ? 'text' : 'password'}
              value={next}
              onChange={e => setNext(e.target.value)}
              placeholder="M\u00ednimo 6 caracteres"
              className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 pr-10 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
            />
            <button type="button" onClick={() => setShowNext(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-forest">
              {showNext ? <EyeOff size={15}/> : <Eye size={15}/>}
            </button>
          </div>
        </div>

        {/* Confirmar */}
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Confirmar nova senha</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repita a nova senha"
            className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
          />
        </div>

        {msg && (
          <p className={\`font-inter text-xs rounded px-3 py-2 \${msg.type === 'ok' ? 'bg-forest/10 text-forest' : 'bg-red-50 text-red-500'}\`}>
            {msg.text}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <button type="submit"
            className="flex items-center gap-2 bg-forest text-white px-5 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors">
            <Check size={14}/> SALVAR SENHA
          </button>
          {hasCustomPwd && (
            <button type="button" onClick={handleReset}
              className="flex items-center gap-1.5 border border-natural-border text-ink-muted px-4 py-2 text-xs rounded hover:border-red-300 hover:text-red-400 transition-colors">
              <Lock size={13}/> Redefinir para padr\u00e3o
            </button>
          )}
        </div>
      </form>

      <div className="mt-4 glass-card rounded-lg p-4">
        <p className="font-inter text-xs text-ink-muted leading-relaxed">
          <strong className="text-ink">Dica:</strong> A senha fica salva neste navegador. Se trocar de dispositivo, use a senha padr\u00e3o <code className="bg-natural px-1 rounded text-forest">barbeza@2025</code> ou redefina pelo link na tela de login.
        </p>
      </div>
    </div>
  )
}
`

// ============================================================
// 5. DashboardHome.tsx — sem checklist de setup, dashboard limpo
// ============================================================
const dashboardHomeContent = `import { BUSINESS, SERVICES } from '@/data/content'
import { ExternalLink, Image, Clock, Scissors, TrendingUp } from 'lucide-react'

export function DashboardHome() {
  const galleryCount = (() => {
    try { return JSON.parse(localStorage.getItem('barbeza-gallery') || '[]').length } catch { return 6 }
  })()
  const servicesCount = (() => {
    try { return JSON.parse(localStorage.getItem('barbeza-services') || '[]').length } catch { return SERVICES.length }
  })()
  const hoursData = (() => {
    try { return JSON.parse(localStorage.getItem('barbeza-hours') || '{}') } catch { return {} }
  })()
  const activeDays = Object.values(hoursData as Record<string, {active: boolean}>).filter(h => h.active).length || 6

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-inter text-xs text-forest tracking-widest uppercase mb-2">Bem-vindo ao</p>
        <h2 className="font-raleway text-ink text-2xl tracking-widest">PAINEL BARBEZA</h2>
        <p className="font-inter text-sm text-ink-muted mt-1">Gerencie servi\u00e7os, galeria e hor\u00e1rios diretamente aqui.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Scissors,    label: 'Servi\u00e7os',     value: String(servicesCount) },
          { icon: Image,       label: 'Fotos',         value: String(galleryCount)  },
          { icon: Clock,       label: 'Dias ativos',   value: String(activeDays)    },
          { icon: TrendingUp,  label: 'Plataforma',    value: 'InBarber'            },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass-card rounded-lg p-5 text-center">
            <Icon size={20} className="text-forest mx-auto mb-2" />
            <p className="font-raleway text-forest text-xl font-bold">{value}</p>
            <p className="font-inter text-xs text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div className="glass-card rounded-lg p-5">
        <h3 className="font-raleway text-ink-muted text-xs tracking-widest uppercase mb-4">Acesso R\u00e1pido</h3>
        <div className="flex flex-col gap-3">
          <a href={BUSINESS.inbarberUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light text-sm font-inter transition-colors group">
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
            Abrir sistema de agendamento (InBarber)
          </a>
          <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light text-sm font-inter transition-colors group">
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
            Ver Instagram @barbezabarbearia
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light text-sm font-inter transition-colors group">
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
            Ver o site ao vivo
          </a>
        </div>
      </div>

      {/* Info box */}
      <div className="glass-card rounded-lg p-5 border border-forest/10">
        <p className="font-inter text-xs text-ink-muted leading-relaxed">
          <strong className="text-forest font-raleway tracking-wider">COMO FUNCIONA:</strong><br/>
          Altera\u00e7\u00f5es em <strong>Servi\u00e7os</strong> e <strong>Hor\u00e1rios</strong> s\u00e3o salvas e refletem no site autom\u00e1ticamente.<br/>
          Fotos adicionadas na <strong>Galeria</strong> aparecem na p\u00e1gina ap\u00f3s um reload do visitante.
        </p>
      </div>
    </div>
  )
}
`

// ============================================================
// 6. DashboardPage.tsx — sem Clientes, com Segurança
// ============================================================
const dashboardPageContent = `import { useState, useEffect } from 'react'
import { LayoutDashboard, Scissors, Image, Clock, ShieldCheck, LogOut, ChevronRight, type LucideProps } from 'lucide-react'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { DashboardLogin } from '@/components/dashboard/DashboardLogin'
import { DashboardHome } from '@/components/dashboard/DashboardHome'
import { ServicesManager } from '@/components/dashboard/ServicesManager'
import { GalleryManager } from '@/components/dashboard/GalleryManager'
import { HoursManager } from '@/components/dashboard/HoursManager'
import { SecurityManager } from '@/components/dashboard/SecurityManager'

type Tab = 'home' | 'services' | 'gallery' | 'hours' | 'security'
type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'home',     label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'services', label: 'Servi\u00e7os',   icon: Scissors },
  { id: 'gallery',  label: 'Galeria',    icon: Image },
  { id: 'hours',    label: 'Hor\u00e1rios',   icon: Clock },
  { id: 'security', label: 'Seguran\u00e7a',  icon: ShieldCheck },
]

export function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('home')
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    setAuthed(localStorage.getItem('barbeza-admin-auth') === '1')
  }, [])

  const logout = () => {
    localStorage.removeItem('barbeza-admin-auth')
    setAuthed(false)
  }

  if (!authed) return <DashboardLogin onAuth={() => setAuthed(true)} />

  const content: Record<Tab, React.ReactElement> = {
    home:     <DashboardHome />,
    services: <ServicesManager />,
    gallery:  <GalleryManager />,
    hours:    <HoursManager />,
    security: <SecurityManager />,
  }

  return (
    <div className="min-h-screen bg-natural-alt flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-natural-border shadow-sm">
        <div className="px-6 py-6 border-b border-natural-border">
          <a href="/" className="flex items-center gap-2 group">
            <img src="/assets/logo/logo-hero.png" alt="Barbeza" className="h-8 object-contain" onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
            <div>
              <p className="font-raleway text-forest text-xs font-bold tracking-widest">BARBEZA</p>
              <p className="font-inter text-[9px] text-ink-muted tracking-wider">ADMIN</p>
            </div>
          </a>
        </div>

        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={\`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all duration-200 \${
                tab === id
                  ? 'bg-forest/10 text-forest border-l-2 border-forest'
                  : 'text-ink-muted hover:text-ink hover:bg-natural'
              }\`}
            >
              <Icon size={16} />
              <span className="font-inter">{label}</span>
              {tab === id && <ChevronRight size={12} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6 border-t border-natural-border pt-4">
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm text-ink-muted hover:text-forest transition-colors">
            <ChevronRight size={14} className="rotate-180" />
            <span className="font-inter">Ver Site</span>
          </a>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 text-sm text-ink-muted/60 hover:text-red-400 transition-colors w-full">
            <LogOut size={14} />
            <span className="font-inter">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden bg-white border-b border-natural-border px-4 py-3 flex items-center justify-between shadow-sm">
        <p className="font-raleway text-forest text-sm tracking-widest">BARBEZA ADMIN</p>
        <button onClick={() => setMobileNav(n => !n)} className="text-ink-muted font-inter text-xs">
          {TABS.find(t => t.id === tab)?.label} \u2261
        </button>
      </div>

      {mobileNav && (
        <div className="md:hidden bg-white border-b border-natural-border px-4 py-2 flex flex-wrap gap-2">
          {TABS.map(({ id, label }) => (
            <button key={id} onClick={() => { setTab(id); setMobileNav(false) }}
              className={\`px-3 py-1.5 text-xs font-raleway tracking-wider border transition-colors rounded \${tab === id ? 'border-forest bg-forest/10 text-forest' : 'border-natural-border text-ink-muted'}\`}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto bg-natural-alt">
        <div className="max-w-4xl">
          {content[tab]}
        </div>
      </main>
    </div>
  )
}
`

// ============================================================
// Escrever todos os arquivos
// ============================================================
const files = [
  ['components/landing/ServicesSection.tsx',    servicesSectionContent],
  ['components/landing/LocationSection.tsx',    locationSectionContent],
  ['components/dashboard/DashboardLogin.tsx',   loginContent],
  ['components/dashboard/SecurityManager.tsx',  securityManagerContent],
  ['components/dashboard/DashboardHome.tsx',    dashboardHomeContent],
  ['pages/DashboardPage.tsx',                   dashboardPageContent],
]

files.forEach(([rel, content]) => {
  fs.writeFileSync(p(rel), content, 'utf8')
  console.log(`OK: ${rel}`)
})

console.log('\nTodos os arquivos escritos. Execute: npm run build')
