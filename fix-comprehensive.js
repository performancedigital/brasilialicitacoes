const fs = require('fs')

const B1 = 'C:/Users/Helbert/Documents/Verdent/barbeza-barbearia'
const B2 = 'C:/Users/Helbert/Documents/Verdent/barbeza2'
const w  = (p, t) => fs.writeFileSync(p, t, { encoding: 'utf8' })

// ─── 1. content.ts — STATS atualizados (ambos) ───────────────────────────────
const content = [
  "import type { Service, GalleryItem, Testimonial, Stat, BusinessHours, SpaceRoom } from '@/types'",
  "",
  "export const BUSINESS = {",
  "  name: 'BARBEZA BARBEARIA',",
  "  slogan: 'Experi\u00eancia Masculina',",
  "  tagline: 'Corte, barba e atendimento diferenciado',",
  "  address: 'Av. Selim Jos\u00e9 de Sales, Beth\u00e2nia',",
  "  city: 'Ipatinga \u2014 MG',",
  "  fullAddress: 'Avenida Selim Jos\u00e9 de Sales, Beth\u00e2nia, Ipatinga - MG',",
  "  phone: '(31) 9831-3831',",
  "  whatsapp: '5531983143831',",
  "  instagram: 'barbezabarbearia',",
  "  instagramUrl: 'https://www.instagram.com/barbezabarbearia',",
  "  inbarberUrl: 'https://chat.inbarberapp.com/AGENDABARBEZA',",
  "  googleMapsUrl: 'https://maps.google.com/maps?q=Avenida+Selim+Jose+de+Sales+Bethania+Ipatinga+MG&output=embed',",
  "  googleMapsLink: 'https://maps.google.com/?q=Avenida+Selim+Jose+de+Sales+Bethania+Ipatinga+MG',",
  "  googleReviewUrl: 'https://g.page/r/CZO_I9XVXZ6LEAI/review',",
  "} as const",
  "",
  "export const SERVICES: Service[] = [",
  "  { id: 'corte',  name: 'Corte',              price: 50,  duration: '45 min',   icon: 'Scissors', description: 'Corte masculino personalizado com t\u00e9cnica e precis\u00e3o. Lavagem e finaliza\u00e7\u00e3o inclu\u00eddas.' },",
  "  { id: 'barba',  name: 'Barba',              price: 30,  duration: '30 min',   icon: 'Smile',    description: 'Modelagem e aparagem de barba com navalha e produtos premium. Toalha quente e hidrata\u00e7\u00e3o.' },",
  "  { id: 'combo',  name: 'Combo',              price: 70,  duration: '1h 15min', icon: 'Sparkles', description: 'Corte + Barba completos. A experi\u00eancia masculina completa com desconto especial.', featured: true },",
  "  { id: 'noivo',  name: 'Making Of do Noivo', price: 150, duration: '2h',       icon: 'Crown',    description: 'Prepara\u00e7\u00e3o completa para o grande dia. Corte, barba, hidrata\u00e7\u00e3o e tratamento premium.', premium: true },",
  "]",
  "",
  "export const HOURS: BusinessHours = {",
  "  monday:    { label: 'Segunda-feira', open: '09:00', close: '19:00', active: true  },",
  "  tuesday:   { label: 'Ter\u00e7a-feira',   open: '09:00', close: '19:00', active: true  },",
  "  wednesday: { label: 'Quarta-feira',  open: '09:00', close: '19:00', active: true  },",
  "  thursday:  { label: 'Quinta-feira',  open: '09:00', close: '19:00', active: true  },",
  "  friday:    { label: 'Sexta-feira',   open: '09:00', close: '20:00', active: true  },",
  "  saturday:  { label: 'S\u00e1bado',        open: '08:00', close: '18:00', active: true  },",
  "  sunday:    { label: 'Domingo',       open: '',      close: '',      active: false },",
  "}",
  "",
  "export const GALLERY: GalleryItem[] = [",
  "  { id: '1', file: '/assets/images/gallery-01.jpg', alt: 'Corte masculino degr\u00ea',     category: 'cortes'   },",
  "  { id: '2', file: '/assets/images/gallery-02.jpg', alt: 'Barba modelada com navalha',  category: 'barbas'   },",
  "  { id: '3', file: '/assets/images/gallery-03.jpg', alt: 'Interior da barbearia',       category: 'ambiente' },",
  "  { id: '4', file: '/assets/images/gallery-04.jpg', alt: 'Corte social cl\u00e1ssico',      category: 'cortes'   },",
  "  { id: '5', file: '/assets/images/gallery-05.jpg', alt: 'Cadeiras de barbeiro',        category: 'ambiente' },",
  "  { id: '6', file: '/assets/images/gallery-06.jpg', alt: 'Barba completa e estilizada', category: 'barbas'   },",
  "]",
  "",
  "export const TESTIMONIALS: Testimonial[] = [",
  "  { id: '1', name: 'Rafael Mendes',  text: 'Melhor barbearia de Ipatinga! Atendimento impec\u00e1vel, ambiente incr\u00edvel e o corte ficou perfeito. N\u00e3o troco por nada.', rating: 5, service: 'Combo' },",
  "  { id: '2', name: 'Lucas Ferreira', text: 'Fiz o Making Of do Noivo e sa\u00ed de l\u00e1 me sentindo o cara mais bem cuidado do mundo. Recomendo 100%!', rating: 5, service: 'Making Of do Noivo' },",
  "  { id: '3', name: 'Bruno Alves',    text: 'Frequento toda semana. O cuidado com cada detalhe \u00e9 o que diferencia a Barbeza. Ambiente top demais.', rating: 5, service: 'Corte + Barba' },",
  "  { id: '4', name: 'Diego Costa',    text: 'Profissionalismo e qualidade acima da m\u00e9dia. A barba ficou impec\u00e1vel, melhor da cidade.', rating: 5, service: 'Barba' },",
  "]",
  "",
  "export const STATS: Stat[] = [",
  "  { label: 'Certifica\u00e7\u00f5es',       value: 10,   suffix: '+',  prefix: ''   },",
  "  { label: 'Clientes Atendidos',  value: 1000, suffix: '+',  prefix: ''   },",
  "  { label: 'Avalia\u00e7\u00e3o Google',    value: 5,    suffix: '.0', prefix: '\u2605 ', link: 'https://g.page/r/CZO_I9XVXZ6LEAI/review' },",
  "  { label: 'Anos de Experi\u00eancia', value: 10,   suffix: '+',  prefix: ''   },",
  "]",
  "",
  "export const SPACE_ROOMS: SpaceRoom[] = [",
  "  { id: 'area-corte', label: '\u00c1rea de Corte', description: 'Esta\u00e7\u00f5es de trabalho premium com cadeiras de barbeiro tradicionais e ilumina\u00e7\u00e3o profissional para cada detalhe do seu estilo.', image: '/assets/renders/render-01.jpg', badge: 'NOVO ESPA\u00c7O'  },",
  "  { id: 'recepcao',   label: 'Recep\u00e7\u00e3o',        description: 'Ambiente acolhedor onde a experi\u00eancia come\u00e7a. Design sofisticado em tons escuros e dourados que define o padr\u00e3o Barbeza.',      image: '/assets/renders/render-02.jpg', badge: 'EM BREVE'     },",
  "  { id: 'sala-vip',   label: 'Sala VIP',         description: 'Espa\u00e7o exclusivo para atendimentos especiais como o Making Of do Noivo. Privacidade e luxo para o seu momento.',                image: '/assets/renders/render-03.jpg', badge: 'EXCLUSIVO'    },",
  "]",
].join('\n')

w(B1 + '/src/data/content.ts', content)
w(B2 + '/src/data/content.ts', content)
console.log('content.ts OK (ambos)')

// ─── 2. types/index.ts — adiciona campo link no Stat (ambos) ─────────────────
// Verifica se o tipo Stat tem o campo link
const fixTypes = (base) => {
  const p = base + '/src/types/index.ts'
  if (!fs.existsSync(p)) return
  let t = fs.readFileSync(p, 'utf8')
  if (!t.includes('link?')) {
    t = t.replace(
      /export (interface|type) Stat[^}]*\{([^}]*)\}/,
      (m) => m.replace(/suffix: string/, 'suffix: string\n  link?: string')
    )
    // fallback simples: adiciona link? antes do fechamento do tipo Stat
    if (!t.includes('link?')) {
      t = t.replace(/(suffix:\s*string)/, '$1\n  link?: string')
    }
    fs.writeFileSync(p, t, { encoding: 'utf8' })
    console.log('types/index.ts atualizado:', p)
  }
}
fixTypes(B1)
fixTypes(B2)

// ─── 3. StatsBar — Avaliação vira link clicável ───────────────────────────────
const statsBarB1 = [
  'import { STATS } from "@/data/content"',
  'import { AnimatedCounter } from "@/components/ui/AnimatedCounter"',
  'import { useScrollAnimation } from "@/hooks/useScrollAnimation"',
  '',
  'export function StatsBar() {',
  '  const { ref, isVisible } = useScrollAnimation(0.3)',
  '  return (',
  '    <section id="stats" className="bg-dark-surface border-y border-dark-border">',
  '      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">',
  '        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">',
  '          {STATS.map((stat, idx) => {',
  '            const inner = (',
  '              <div className="flex flex-col items-center text-center gap-1">',
  '                <div className="font-oswald font-bold text-3xl md:text-4xl text-brand transition-all duration-500"',
  '                  style={{ opacity: isVisible ? 1 : 0, transitionDelay: `${idx * 100}ms` }}>',
  '                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={1800} isVisible={isVisible} />',
  '                </div>',
  '                <p className="font-inter text-xs text-cream-muted tracking-wider uppercase">',
  '                  {stat.label}',
  '                </p>',
  '                {stat.link && <p className="font-inter text-[9px] text-brand/60 tracking-widest mt-0.5">AVALIAR \u2197</p>}',
  '              </div>',
  '            )',
  '            return stat.link ? (',
  '              <a key={idx} href={stat.link} target="_blank" rel="noopener noreferrer"',
  '                className="group hover:scale-105 transition-transform duration-200 cursor-pointer">',
  '                {inner}',
  '              </a>',
  '            ) : (',
  '              <div key={idx}>{inner}</div>',
  '            )',
  '          })}',
  '        </div>',
  '      </div>',
  '    </section>',
  '  )',
  '}',
].join('\n')

const statsBarB2 = statsBarB1
  .replace('bg-dark-surface border-y border-dark-border', 'bg-forest-deep border-y border-forest/20')
  .replace(/text-brand/g, 'text-olive')
  .replace(/text-cream-muted/g, 'text-white/60')
  .replace(/font-oswald/g, 'font-raleway')
  .replace(/text-brand\/60/g, 'text-olive/60')

w(B1 + '/src/components/landing/StatsBar.tsx', statsBarB1)
w(B2 + '/src/components/landing/StatsBar.tsx', statsBarB2)
console.log('StatsBar OK (ambos)')

// ─── 4. BookingSection — sem iframe, só botões robustos ──────────────────────
const bookingB1 = [
  'import { Phone, MessageCircle, Calendar, ExternalLink } from "lucide-react"',
  'import { BUSINESS } from "@/data/content"',
  'import { Button } from "@/components/ui/Button"',
  'import { GoldDivider } from "@/components/ui/GoldDivider"',
  'import { useScrollAnimation } from "@/hooks/useScrollAnimation"',
  '',
  'export function BookingSection() {',
  '  const { ref, isVisible } = useScrollAnimation(0.1)',
  '  return (',
  '    <section id="agendamento" className="section-padding bg-dark">',
  '      <div className="max-w-7xl mx-auto px-6 md:px-10">',
  '        <div className="text-center mb-12">',
  '          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Reserve seu hor\u00e1rio</p>',
  '          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-cream mb-4 tracking-wider">Agendamento</h2>',
  '          <GoldDivider className="max-w-xs mx-auto"/>',
  '        </div>',
  '        <div ref={ref} className="max-w-2xl mx-auto"',
  '          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>',
  '',
  '          {/* Botao principal InBarber */}',
  '          <a href={BUSINESS.inbarberUrl} target="_blank" rel="noopener noreferrer"',
  '            className="group flex items-center justify-between w-full bg-brand hover:bg-brand-light text-dark px-8 py-6 rounded-2xl mb-4 transition-all duration-300 shadow-[0_4px_30px_rgba(139,133,85,0.3)] hover:shadow-[0_6px_40px_rgba(139,133,85,0.5)]">',
  '            <div className="flex items-center gap-4">',
  '              <div className="w-12 h-12 rounded-full bg-dark/15 flex items-center justify-center">',
  '                <Calendar size={22} className="text-dark"/>',
  '              </div>',
  '              <div className="text-left">',
  '                <p className="font-oswald text-lg font-bold tracking-widest">AGENDAR ONLINE</p>',
  '                <p className="font-inter text-xs text-dark/70">via InBarber App \u2014 r\u00e1pido e f\u00e1cil</p>',
  '              </div>',
  '            </div>',
  '            <ExternalLink size={20} className="text-dark/60 group-hover:text-dark transition-colors"/>',
  '          </a>',
  '',
  '          {/* Outros canais */}',
  '          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">',
  '            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer"',
  '              className="flex items-center gap-4 p-5 rounded-xl border border-dark-border hover:border-brand bg-dark-card hover:bg-dark-surface transition-all duration-200 group">',
  '              <div className="w-10 h-10 rounded-full bg-green-900/40 border border-green-700/40 flex items-center justify-center">',
  '                <MessageCircle size={18} className="text-green-400"/>',
  '              </div>',
  '              <div>',
  '                <p className="font-oswald text-cream font-bold text-sm tracking-widest">WHATSAPP</p>',
  '                <p className="font-inter text-xs text-cream-muted">{BUSINESS.phone}</p>',
  '              </div>',
  '            </a>',
  '            <a href={`tel:${BUSINESS.phone}`}',
  '              className="flex items-center gap-4 p-5 rounded-xl border border-dark-border hover:border-brand bg-dark-card hover:bg-dark-surface transition-all duration-200 group">',
  '              <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">',
  '                <Phone size={18} className="text-brand"/>',
  '              </div>',
  '              <div>',
  '                <p className="font-oswald text-cream font-bold text-sm tracking-widest">LIGAR</p>',
  '                <p className="font-inter text-xs text-cream-muted">{BUSINESS.phone}</p>',
  '              </div>',
  '            </a>',
  '          </div>',
  '',
  '          {/* Info hor\u00e1rio r\u00e1pido */}',
  '          <div className="text-center p-6 rounded-xl border border-dark-border bg-dark-card">',
  '            <p className="font-inter text-xs text-brand tracking-widest uppercase mb-3">Hor\u00e1rios de Atendimento</p>',
  '            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">',
  '              <span className="font-inter text-sm text-cream-muted">Seg \u2013 Sex: <span className="text-cream font-medium">09h \u2013 19h</span></span>',
  '              <span className="font-inter text-sm text-cream-muted">Sexta: <span className="text-cream font-medium">09h \u2013 20h</span></span>',
  '              <span className="font-inter text-sm text-cream-muted">S\u00e1bado: <span className="text-cream font-medium">08h \u2013 18h</span></span>',
  '            </div>',
  '          </div>',
  '        </div>',
  '      </div>',
  '    </section>',
  '  )',
  '}',
].join('\n')

const bookingB2 = bookingB1
  .replace('bg-dark">', 'bg-natural-alt">')
  .replace('text-brand tracking-[0.35em]', 'text-forest tracking-[0.35em]')
  .replace('text-cream mb-4 tracking-wider', 'text-ink mb-4 tracking-wider')
  .replace(/font-oswald/g, 'font-raleway')
  .replace('bg-brand hover:bg-brand-light text-dark', 'bg-forest hover:bg-forest/80 text-white')
  .replace('bg-dark/15', 'bg-white/15')
  .replace(/text-dark(?!\/)/g, 'text-white')
  .replace('text-dark/70', 'text-white/70')
  .replace('text-dark/60', 'text-white/60')
  .replace('text-dark/15', 'text-white/15')
  .replace(/bg-dark-card/g, 'bg-white')
  .replace(/bg-dark-surface/g, 'bg-natural')
  .replace(/border-dark-border/g, 'border-natural-border')
  .replace(/border-brand/g, 'border-forest')
  .replace('bg-green-900/40 border border-green-700/40', 'bg-green-50 border border-green-200')
  .replace('text-green-400', 'text-green-600')
  .replace('bg-brand/10 border border-brand/20', 'bg-forest/8 border border-forest/15')
  .replace(/text-brand(?![/-])/g, 'text-forest')
  .replace(/text-cream-muted/g, 'text-ink-muted')
  .replace(/text-cream(?![-])/g, 'text-ink')
  .replace('text-brand tracking-widest uppercase', 'text-forest tracking-widest uppercase')

w(B1 + '/src/components/landing/BookingSection.tsx', bookingB1)
w(B2 + '/src/components/landing/BookingSection.tsx', bookingB2)
console.log('BookingSection OK (sem iframe, ambos)')

// ─── 5. SpaceSection V1 — com tokens de cor corretos ─────────────────────────
const spaceB1 = [
  'import { useState } from "react"',
  'import { SPACE_ROOMS, BUSINESS } from "@/data/content"',
  'import { Button } from "@/components/ui/Button"',
  'import { GoldDivider } from "@/components/ui/GoldDivider"',
  'import { useScrollAnimation } from "@/hooks/useScrollAnimation"',
  '',
  'export function SpaceSection() {',
  '  const [active, setActive] = useState(0)',
  '  const { ref, isVisible } = useScrollAnimation(0.1)',
  '  const room = SPACE_ROOMS[active]',
  '  return (',
  '    <section id="espaco" className="section-padding bg-dark">',
  '      <div className="max-w-7xl mx-auto px-6 md:px-10">',
  '        <div className="text-center mb-14">',
  '          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Nosso Espa\u00e7o</p>',
  '          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-cream mb-4 tracking-wider">O Ambiente</h2>',
  '          <GoldDivider className="max-w-xs mx-auto"/>',
  '        </div>',
  '        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"',
  '          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>',
  '          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">',
  '            <img src={room.image} alt={room.label}',
  '              className="w-full h-full object-cover transition-all duration-700"',
  '              onError={(e) => { (e.target as HTMLImageElement).style.opacity="0" }}/>',
  '            <div className="absolute inset-0 flex items-center justify-center bg-dark/60">',
  '              <div className="text-center p-8">',
  '                <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">',
  '                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5">',
  '                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  '                    <polyline points="9 22 9 12 15 12 15 22"/>',
  '                  </svg>',
  '                </div>',
  '                <p className="font-oswald text-cream font-bold text-sm tracking-widest">{room.label}</p>',
  '                <p className="font-inter text-cream-muted text-xs mt-1">Imagem em breve</p>',
  '              </div>',
  '            </div>',
  '            <div className="absolute top-4 left-4">',
  '              <span className="bg-brand text-dark text-[9px] font-inter font-bold px-3 py-1 tracking-widest rounded">{room.badge}</span>',
  '            </div>',
  '          </div>',
  '          <div className="flex flex-col gap-6">',
  '            <div className="flex gap-3 flex-wrap">',
  '              {SPACE_ROOMS.map((r,i) => (',
  '                <button key={r.id} onClick={() => setActive(i)}',
  '                  className={`font-inter text-xs tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${',
  '                    i === active',
  '                      ? "bg-brand text-dark border-brand"',
  '                      : "border-dark-border text-cream-muted hover:border-brand hover:text-brand"',
  '                  }`}>{r.label}</button>',
  '              ))}',
  '            </div>',
  '            <div>',
  '              <h3 className="font-oswald text-3xl font-bold text-cream mb-4 tracking-wider">{room.label}</h3>',
  '              <p className="font-inter text-cream-muted leading-relaxed">{room.description}</p>',
  '            </div>',
  '            <div className="pt-2">',
  '              <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg" variant="gold">AGENDAR VISITA</Button>',
  '            </div>',
  '          </div>',
  '        </div>',
  '      </div>',
  '    </section>',
  '  )',
  '}',
].join('\n')

w(B1 + '/src/components/landing/SpaceSection.tsx', spaceB1)
console.log('SpaceSection B1 OK')

// ─── 6. ServicesSection V1 — com tokens de cor corretos ──────────────────────
const servicesB1 = [
  'import { Scissors, Smile, Sparkles, Crown, type LucideProps } from "lucide-react"',
  'import { type ForwardRefExoticComponent, type RefAttributes } from "react"',
  'import { SERVICES, BUSINESS } from "@/data/content"',
  'import { Button } from "@/components/ui/Button"',
  'import { GoldDivider } from "@/components/ui/GoldDivider"',
  'import { useScrollAnimation } from "@/hooks/useScrollAnimation"',
  'type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>',
  'const ICONS: Record<string,LucideIcon> = { Scissors, Smile, Sparkles, Crown }',
  '',
  'export function ServicesSection() {',
  '  const { ref, isVisible } = useScrollAnimation(0.1)',
  '  return (',
  '    <section id="servicos" className="section-padding bg-dark-surface">',
  '      <div className="max-w-7xl mx-auto px-6 md:px-10">',
  '        <div className="text-center mb-16">',
  '          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">O que oferecemos</p>',
  '          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-cream mb-4 tracking-wider">Nossos Servi\u00e7os</h2>',
  '          <GoldDivider icon="scissor" className="max-w-xs mx-auto"/>',
  '        </div>',
  '        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">',
  '          {SERVICES.map((sv,i) => {',
  '            const Icon = ICONS[sv.icon] || Scissors',
  '            return (',
  '              <div key={sv.id} className="bg-dark-card border border-dark-border rounded-xl p-6 flex flex-col gap-4 relative hover:border-brand transition-colors duration-200"',
  '                style={{ opacity:isVisible?1:0, transform:isVisible?"none":"translateY(30px)", transition:`all 0.5s ease ${i*100}ms` }}>',
  '                {sv.featured && <span className="absolute top-4 right-4 bg-brand text-dark text-[9px] font-inter font-bold px-2 py-1 tracking-wider rounded">POPULAR</span>}',
  '                {sv.premium && <span className="absolute top-4 right-4 border border-brand text-brand text-[9px] font-inter font-bold px-2 py-1 tracking-wider rounded">PREMIUM</span>}',
  '                <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">',
  '                  <Icon size={20} className="text-brand"/>',
  '                </div>',
  '                <div className="flex-1">',
  '                  <h3 className="font-oswald text-cream font-bold text-base tracking-wider mb-2">{sv.name}</h3>',
  '                  <p className="font-inter text-sm text-cream-muted leading-relaxed">{sv.description}</p>',
  '                </div>',
  '                <div className="flex items-end justify-between border-t border-dark-border pt-4 mt-auto">',
  '                  <span className="font-oswald text-2xl font-bold text-brand">R${sv.price}</span>',
  '                  <span className="font-inter text-xs text-cream-dim">{sv.duration}</span>',
  '                </div>',
  '                <Button href={BUSINESS.inbarberUrl} target="_blank" variant="outline" size="sm" className="w-full">AGENDAR</Button>',
  '              </div>',
  '            )',
  '          })}',
  '        </div>',
  '      </div>',
  '    </section>',
  '  )',
  '}',
].join('\n')

w(B1 + '/src/components/landing/ServicesSection.tsx', servicesB1)
console.log('ServicesSection B1 OK')

// ─── 7. GallerySection V1 ─────────────────────────────────────────────────────
const galleryB1 = [
  'import { useState } from "react"',
  'import { GALLERY } from "@/data/content"',
  'import { GoldDivider } from "@/components/ui/GoldDivider"',
  'import { useScrollAnimation } from "@/hooks/useScrollAnimation"',
  'const CATS = [',
  '  { key: "all",     label: "Todos"    },',
  '  { key: "cortes",  label: "Cortes"   },',
  '  { key: "barbas",  label: "Barbas"   },',
  '  { key: "ambiente",label: "Ambiente" },',
  ']',
  'export function GallerySection() {',
  '  const [cat, setCat] = useState("all")',
  '  const { ref, isVisible } = useScrollAnimation(0.1)',
  '  const filtered = cat === "all" ? GALLERY : GALLERY.filter(g => g.category === cat)',
  '  return (',
  '    <section id="galeria" className="section-padding bg-dark-surface">',
  '      <div className="max-w-7xl mx-auto px-6 md:px-10">',
  '        <div className="text-center mb-12">',
  '          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Nosso trabalho</p>',
  '          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-cream mb-4 tracking-wider">Galeria</h2>',
  '          <GoldDivider className="max-w-xs mx-auto"/>',
  '        </div>',
  '        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">',
  '          {CATS.map(c => (',
  '            <button key={c.key} onClick={() => setCat(c.key)}',
  '              className={`font-inter text-xs tracking-wider px-5 py-2 rounded-full border transition-all duration-200 ${',
  '                c.key === cat',
  '                  ? "bg-brand text-dark border-brand"',
  '                  : "border-dark-border text-cream-muted hover:border-brand hover:text-brand"',
  '              }`}>{c.label}</button>',
  '          ))}',
  '        </div>',
  '        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">',
  '          {filtered.map((item, i) => (',
  '            <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"',
  '              style={{ opacity:isVisible?1:0, transform:isVisible?"none":"scale(0.95)", transition:`all 0.5s ease ${i*80}ms` }}>',
  '              <img src={item.file} alt={item.alt}',
  '                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"',
  '                onError={(e) => { (e.target as HTMLImageElement).style.display="none" }}/>',
  '              <div className="absolute inset-0 bg-dark/80 flex items-center justify-center">',
  '                <p className="font-inter text-cream-muted text-[11px] text-center px-3">{item.alt}</p>',
  '              </div>',
  '              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">',
  '                <p className="font-inter text-cream text-xs font-medium">{item.alt}</p>',
  '              </div>',
  '            </div>',
  '          ))}',
  '        </div>',
  '      </div>',
  '    </section>',
  '  )',
  '}',
].join('\n')

w(B1 + '/src/components/landing/GallerySection.tsx', galleryB1)
console.log('GallerySection B1 OK')

// ─── 8. LocationSection V1 ───────────────────────────────────────────────────
const locationB1 = [
  'import { MapPin, Clock, Phone, Instagram, MessageCircle } from "lucide-react"',
  'import { BUSINESS, HOURS } from "@/data/content"',
  'import { Button } from "@/components/ui/Button"',
  'import { GoldDivider } from "@/components/ui/GoldDivider"',
  'import { useScrollAnimation } from "@/hooks/useScrollAnimation"',
  '',
  'export function LocationSection() {',
  '  const { ref, isVisible } = useScrollAnimation(0.1)',
  '  const activeHours = Object.values(HOURS).filter(h => h.active)',
  '  return (',
  '    <section id="contato" className="section-padding bg-dark-surface">',
  '      <div className="max-w-7xl mx-auto px-6 md:px-10">',
  '        <div className="text-center mb-12">',
  '          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Como chegar</p>',
  '          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-cream mb-4 tracking-wider">Localiza\u00e7\u00e3o</h2>',
  '          <GoldDivider className="max-w-xs mx-auto"/>',
  '        </div>',
  '        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"',
  '          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>',
  '          <div className="rounded-2xl overflow-hidden border border-dark-border aspect-[4/3]">',
  '            <iframe src={BUSINESS.googleMapsUrl} className="w-full h-full border-0" title="Localiza\u00e7\u00e3o Barbeza" loading="lazy"/>',
  '          </div>',
  '          <div className="flex flex-col gap-6">',
  '            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">',
  '              <div className="flex items-start gap-4 mb-5">',
  '                <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">',
  '                  <MapPin size={18} className="text-brand"/>',
  '                </div>',
  '                <div>',
  '                  <p className="font-oswald text-cream font-bold text-sm tracking-wider mb-1">Endere\u00e7o</p>',
  '                  <p className="font-inter text-cream-muted text-sm leading-relaxed">{BUSINESS.fullAddress}</p>',
  '                  <a href={BUSINESS.googleMapsLink} target="_blank" rel="noopener noreferrer"',
  '                    className="font-inter text-xs text-brand hover:underline mt-1 inline-block">Ver no Google Maps \u2192</a>',
  '                </div>',
  '              </div>',
  '              <div className="flex items-start gap-4">',
  '                <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">',
  '                  <Clock size={18} className="text-brand"/>',
  '                </div>',
  '                <div className="flex-1">',
  '                  <p className="font-oswald text-cream font-bold text-sm tracking-wider mb-3">Hor\u00e1rio de Funcionamento</p>',
  '                  <div className="space-y-1.5">',
  '                    {activeHours.map(h => (',
  '                      <div key={h.label} className="flex items-center justify-between text-xs">',
  '                        <span className="font-inter text-cream-muted">{h.label}</span>',
  '                        <span className="font-inter font-medium text-brand">{h.open} \u2013 {h.close}</span>',
  '                      </div>',
  '                    ))}',
  '                    <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-dark-border">',
  '                      <span className="font-inter text-cream-muted">Domingo</span>',
  '                      <span className="font-inter text-cream-dim">Fechado</span>',
  '                    </div>',
  '                  </div>',
  '                </div>',
  '              </div>',
  '            </div>',
  '            <div className="flex flex-col gap-3">',
  '              <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer">',
  '                <Button size="lg" className="w-full bg-green-700 hover:bg-green-600 border-0 text-white">',
  '                  <MessageCircle size={18} className="mr-2"/> WHATSAPP',
  '                </Button>',
  '              </a>',
  '              <div className="grid grid-cols-2 gap-3">',
  '                <a href={`tel:${BUSINESS.phone}`}>',
  '                  <Button variant="outline" size="sm" className="w-full"><Phone size={14} className="mr-2"/> Ligar</Button>',
  '                </a>',
  '                <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer">',
  '                  <Button variant="outline" size="sm" className="w-full"><Instagram size={14} className="mr-2"/> Instagram</Button>',
  '                </a>',
  '              </div>',
  '            </div>',
  '          </div>',
  '        </div>',
  '      </div>',
  '    </section>',
  '  )',
  '}',
].join('\n')

w(B1 + '/src/components/landing/LocationSection.tsx', locationB1)
console.log('LocationSection B1 OK')

// ─── 9. TestimonialsSection V1 ────────────────────────────────────────────────
const testimonialsB1 = [
  'import { useState, useEffect, useRef } from "react"',
  'import { ChevronLeft, ChevronRight, Star } from "lucide-react"',
  'import { TESTIMONIALS } from "@/data/content"',
  'import { GoldDivider } from "@/components/ui/GoldDivider"',
  'import { useScrollAnimation } from "@/hooks/useScrollAnimation"',
  '',
  'export function TestimonialsSection() {',
  '  const [cur, setCur] = useState(0)',
  '  const { ref, isVisible } = useScrollAnimation(0.2)',
  '  const timer = useRef<ReturnType<typeof setInterval>>()',
  '  const next = () => setCur(c => (c+1)%TESTIMONIALS.length)',
  '  const prev = () => setCur(c => (c-1+TESTIMONIALS.length)%TESTIMONIALS.length)',
  '  useEffect(() => { timer.current = setInterval(next, 5000); return () => clearInterval(timer.current) }, [])',
  '  const t = TESTIMONIALS[cur]',
  '  return (',
  '    <section id="depoimentos" className="section-padding bg-dark">',
  '      <div className="max-w-4xl mx-auto px-6 md:px-10">',
  '        <div className="text-center mb-14">',
  '          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">O que dizem</p>',
  '          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-cream mb-4 tracking-wider">Avalia\u00e7\u00f5es</h2>',
  '          <GoldDivider className="max-w-xs mx-auto"/>',
  '        </div>',
  '        <div ref={ref} style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>',
  '          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-12 text-center relative">',
  '            <div className="absolute top-6 left-8 text-brand/5 font-playfair text-9xl leading-none select-none">"</div>',
  '            <div className="flex items-center justify-center gap-1 mb-6">',
  '              {Array.from({length:t.rating}).map((_,i) => <Star key={i} size={16} className="text-brand fill-brand"/>)}',
  '            </div>',
  '            <p className="font-playfair italic text-lg md:text-xl text-cream-muted leading-relaxed mb-6 relative z-10">"{t.text}"</p>',
  '            <div className="flex flex-col items-center gap-1">',
  '              <p className="font-oswald text-brand text-sm tracking-widest font-bold">{t.name}</p>',
  '              {t.service && <p className="font-inter text-xs text-cream-dim">{t.service}</p>}',
  '            </div>',
  '          </div>',
  '          <div className="flex items-center justify-center gap-6 mt-8">',
  '            <button onClick={prev} className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-cream-muted hover:border-brand hover:text-brand transition-all duration-200"><ChevronLeft size={18}/></button>',
  '            <div className="flex gap-2">',
  '              {TESTIMONIALS.map((_,i) => (',
  '                <button key={i} onClick={() => setCur(i)} className={`rounded-full transition-all duration-300 ${i===cur?"w-6 h-2 bg-brand":"w-2 h-2 bg-dark-border"}`}/>',
  '              ))}',
  '            </div>',
  '            <button onClick={next} className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-cream-muted hover:border-brand hover:text-brand transition-all duration-200"><ChevronRight size={18}/></button>',
  '          </div>',
  '        </div>',
  '      </div>',
  '    </section>',
  '  )',
  '}',
].join('\n')

w(B1 + '/src/components/landing/TestimonialsSection.tsx', testimonialsB1)
console.log('TestimonialsSection B1 OK')

console.log('\nTodos os arquivos gravados!')
