import Link from 'next/link'
import {
  Bot,
  CheckCircle,
  ChevronRight,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Search,
  ShieldCheck,
  Target,
  Award,
  TrendingUp,
  Landmark,
  Bell,
  BarChart2,
  Activity,
  MessageCircle,
} from 'lucide-react'

// WhatsApp da consultoria
const WHATSAPP = '5531987551055'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Olá! Vim pelo site da Brasília Consultoria em Licitações e quero saber mais.'
)}`

// ─── Conteúdo ───────────────────────────────────────────────────────────────

const steps = [
  {
    num: '01',
    icon: Landmark,
    title: 'Coleta nacional automática',
    description:
      'Monitoramos o PNCP (Portal Nacional de Contratações Públicas) 24/7 — a base oficial que reúne licitações federais, estaduais e municipais de todo o Brasil. Você não precisa visitar nenhum portal.',
    highlight: 'Cobertura nacional',
  },
  {
    num: '02',
    icon: Bot,
    title: 'IA analisa cada edital',
    description:
      'Nossa inteligência artificial lê e interpreta os editais, destacando objeto, valores, prazos e pontos de atenção — e você ainda pode conversar com a IA para tirar dúvidas sobre qualquer edital.',
    highlight: 'Análise em segundos',
  },
  {
    num: '03',
    icon: Target,
    title: 'Você decide com estratégia',
    description:
      'Organize suas disputas num Kanban profissional, receba alertas das oportunidades certas e conte com a nossa consultoria especializada para preparar propostas vencedoras.',
    highlight: 'Da oportunidade ao contrato',
  },
]

const features = [
  {
    icon: Search,
    title: 'Busca Inteligente',
    description:
      'Pesquise editais por palavra-chave, com filtros avançados por estado, valor, modalidade e prazo. Encontre em segundos o que levaria horas garimpando portais.',
    badge: null,
    color: 'neon',
  },
  {
    icon: MessageSquare,
    title: 'Converse com o Edital',
    description:
      'Chat com IA sobre qualquer edital: pergunte sobre prazos, valores, modalidade, habilitação e critérios. Decida rápido se vale a pena participar.',
    badge: 'PRO',
    color: 'purple',
  },
  {
    icon: LayoutDashboard,
    title: 'Kanban de Disputas',
    description:
      'Gerencie sua pipeline como um CRM: mova editais entre Lead, Avaliando, Encaminhado e Vencido, com notas e acompanhamento de valores.',
    badge: 'PRO',
    color: 'neon',
  },
  {
    icon: Bell,
    title: 'Alertas das Oportunidades',
    description:
      'Seja avisado das licitações que combinam com o seu perfil — por estado, valor mínimo e palavras-chave — sem ficar checando o sistema o dia todo.',
    badge: 'PRO',
    color: 'purple',
  },
  {
    icon: BarChart2,
    title: 'Painel Analítico',
    description:
      'Acompanhe disputas ativas, valores em jogo e taxa de vitória. Tome decisões baseadas em dados reais do seu negócio.',
    badge: 'PRO',
    color: 'neon',
  },
  {
    icon: ShieldCheck,
    title: 'Consultoria Especializada',
    description:
      'Mais que software: nosso time apoia sua empresa na análise, habilitação e estratégia das disputas. Fale com um especialista quando precisar.',
    badge: null,
    color: 'purple',
  },
]

// Pilares da marca (no lugar de depoimentos fabricados)
const pillars = [
  {
    icon: ShieldCheck,
    title: 'Segurança',
    description: 'Informação oficial direto do PNCP, com rastreabilidade e atualização constante.',
  },
  {
    icon: Target,
    title: 'Estratégia',
    description: 'IA + consultoria para você participar das disputas certas, no momento certo.',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Processo organizado de ponta a ponta, da descoberta do edital à proposta.',
  },
  {
    icon: TrendingUp,
    title: 'Resultados',
    description: 'Mais tempo, menos esforço operacional e mais contratos públicos conquistados.',
  },
]

const plans = [
  {
    name: 'FREE',
    label: 'Grátis',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para começar a explorar as licitações públicas.',
    features: [
      'Busca de editais do PNCP',
      'Filtros por estado e modalidade',
      'Visualização do edital no portal',
      'Sem resumo por IA',
      'Suporte por e-mail',
    ],
    cta: 'Começar Grátis',
    ctaVariant: 'outline',
    highlight: false,
    badge: null,
  },
  {
    name: 'PRO',
    label: 'Pro',
    price: 'R$ 97',
    period: '/mês',
    description: 'Para licitantes que querem velocidade e inteligência.',
    features: [
      'Tudo do plano Grátis',
      'Resumo e chat com IA nos editais',
      'Alertas das oportunidades',
      'Kanban de disputas',
      'Painel analítico',
      'Suporte prioritário',
    ],
    cta: 'Assinar PRO',
    ctaVariant: 'outline-neon',
    highlight: true,
    badge: null,
  },
  {
    name: 'INFINITY_PLUS',
    label: 'Infinity+',
    price: 'R$ 243',
    period: '/mês',
    description: 'Para empresas que não querem perder nenhuma disputa.',
    features: [
      'Tudo do plano Pro',
      'IA com prioridade e limites maiores',
      'Alertas customizados',
      'Consultoria especializada',
      'Onboarding personalizado',
      'Suporte 24/7 por WhatsApp',
    ],
    cta: 'Assinar Infinity+',
    ctaVariant: 'filled',
    highlight: false,
    badge: 'MAIS COMPLETO',
  },
]

const stats = [
  { value: 'Nacional', label: 'cobertura via PNCP (federal, estadual e municipal)', icon: Landmark },
  { value: 'Diária', label: 'atualização automática de novos editais', icon: Activity },
  { value: 'IA', label: 'análise e chat em cada edital', icon: Bot },
  { value: '4 fases', label: 'gestão de disputas no Kanban', icon: LayoutDashboard },
]

// ─── Componente ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      {/* ── Navegação ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 glass-dark">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon to-neon-purple flex items-center justify-center">
            <Landmark size={18} className="text-black" />
          </div>
          <span className="font-bold text-white text-sm leading-tight tracking-tight">
            BRASÍLIA{' '}
            <span className="text-neon text-[11px] font-semibold uppercase block sm:inline">Consultoria em Licitações</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="text-slate-400 hover:text-white text-sm transition-colors">Como Funciona</a>
          <a href="#funcionalidades" className="text-slate-400 hover:text-white text-sm transition-colors">Funcionalidades</a>
          <a href="#planos" className="text-slate-400 hover:text-white text-sm transition-colors">Planos</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-slate-400 hover:text-white text-sm transition-colors px-4 py-2">Entrar</Link>
          <Link
            href="/login"
            className="bg-neon text-black font-semibold text-sm px-5 py-2.5 rounded-lg hover:shadow-neon hover:scale-105 transition-all duration-200"
          >
            Começar Grátis
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 grid-bg">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-neon-purple/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-neon/20">
              <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              <span className="text-neon text-xs font-semibold tracking-wider uppercase">
                Segurança • Estratégia • Excelência • Resultados
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] text-white mb-6 tracking-tight">
              A consultoria <span className="gradient-text">inteligente</span> em licitações públicas
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl lg:max-w-none">
              Encontre, analise e acompanhe licitações de <strong className="text-white">todo o Brasil</strong> com
              inteligência artificial e o apoio de quem entende do assunto. Pare de garimpar portais —
              nós trazemos as oportunidades certas até você.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                href="/login"
                className="group flex items-center justify-center gap-2 bg-neon text-black font-bold text-base px-8 py-4 rounded-xl hover:shadow-neon-lg hover:scale-105 transition-all duration-200"
              >
                Começar Agora — É Grátis
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 glass border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-xl hover:border-neon/40 hover:bg-neon/5 transition-all duration-200"
              >
                <MessageCircle size={18} className="text-neon" />
                Falar no WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: Landmark, text: 'Cobertura nacional (PNCP)' },
                { icon: FileText, text: 'Milhares de editais' },
                { icon: Bot, text: 'IA incluída' },
              ].map((s) => (
                <div key={s.text} className="flex items-center gap-2 glass rounded-full px-4 py-2 border border-white/10">
                  <s.icon size={14} className="text-neon" />
                  <span className="text-white text-sm font-medium">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup do painel */}
          <div className="flex-1 w-full max-w-2xl animate-float">
            <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.1)]">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 bg-white/5 rounded-md h-6 flex items-center px-3">
                  <span className="text-slate-500 text-xs">app · painel de oportunidades</span>
                </div>
              </div>

              <div className="p-5 bg-dark-800/80">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Disputas ativas', value: '—', color: 'text-neon' },
                    { label: 'Valor em jogo', value: '—', color: 'text-neon' },
                    { label: 'Taxa de vitória', value: '—', color: 'text-green-400' },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-3">
                      <p className="text-slate-500 text-[10px] mb-1">{s.label}</p>
                      <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'Aquisição de equipamentos de TI', value: 'R$ 234.500', time: '2d 4h', urgent: false },
                    { title: 'Serviços de limpeza predial', value: 'R$ 89.000', time: '18h', urgent: true },
                    { title: 'Mobiliário para secretaria municipal', value: 'R$ 145.200', time: '5d 2h', urgent: false },
                  ].map((b) => (
                    <div key={b.title} className="flex items-center gap-3 glass rounded-lg p-3 hover:border-neon/20 transition-all">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{b.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-neon text-[10px] font-mono">PNCP</span>
                          <span className="text-slate-500 text-[10px]">•</span>
                          <span className="text-slate-400 text-[10px]">{b.value}</span>
                        </div>
                      </div>
                      <div className={`text-[10px] font-bold px-2 py-1 rounded-md ${b.urgent ? 'bg-red-500/20 text-red-400' : 'bg-neon/10 text-neon'}`}>
                        {b.time}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 glass rounded-xl p-3 border border-neon/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={14} className="text-neon" />
                    <span className="text-neon text-xs font-semibold">Resumo IA do edital</span>
                    <div className="ml-auto flex gap-1">
                      <div className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse [animation-delay:0.4s]" />
                    </div>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Pregão eletrônico para fornecimento de equipamentos de TI. Veja objeto, valor estimado,
                    prazo de propostas e pontos de atenção — e pergunte o que quiser à IA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-neon">
          <span className="text-slate-600 text-xs">Role para ver mais</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-neon rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section id="como-funciona" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-800/50 to-black pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Como Funciona</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 mb-4">
              Da oportunidade à proposta <span className="gradient-text">em 3 passos</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Automatizamos o trabalho operacional para você focar no que importa: vencer disputas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-neon/30 to-transparent z-0 -translate-y-px" />
                )}
                <div className="glass rounded-2xl p-8 border border-white/10 hover:border-neon/30 hover:shadow-neon transition-all duration-300 group relative z-10">
                  <div className="text-6xl font-black text-white/5 absolute top-4 right-6 select-none">{step.num}</div>
                  <div className="w-14 h-14 rounded-2xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-6 group-hover:bg-neon/20 group-hover:border-neon/40 transition-all">
                    <step.icon size={24} className="text-neon" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{step.description}</p>
                  <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-3 py-1.5">
                    <CheckCircle size={12} className="text-neon" />
                    <span className="text-neon text-xs font-semibold">{step.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Funcionalidades ── */}
      <section id="funcionalidades" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Funcionalidades</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 mb-4">
              Tudo para <span className="gradient-text">dominar as disputas</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Tecnologia e consultoria juntas, num só lugar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass rounded-2xl p-7 border border-white/10 hover:border-neon/30 hover:shadow-neon transition-all duration-300 group card-hover">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.color === 'neon' ? 'bg-neon/10 border border-neon/20 group-hover:bg-neon/20' : 'bg-neon-purple/10 border border-neon-purple/20 group-hover:bg-neon-purple/20'} transition-all`}>
                    <feature.icon size={22} className={feature.color === 'neon' ? 'text-neon' : 'text-neon-purple'} />
                  </div>
                  {feature.badge && (
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${feature.color === 'neon' ? 'bg-neon/10 text-neon border border-neon/20' : 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20'}`}>
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planos ── */}
      <section id="planos" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-800/30 to-black pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Planos & Preços</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 mb-4">
              Invista em <span className="gradient-text">resultados</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Um único contrato ganho já paga a assinatura. Escolha o plano do tamanho do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative glass rounded-2xl p-8 flex flex-col transition-all duration-300 ${plan.name === 'INFINITY_PLUS' ? 'border-2 border-neon shadow-neon-lg scale-[1.02]' : plan.highlight ? 'border border-neon/40 hover:border-neon/70' : 'border border-white/10 hover:border-white/20'}`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon text-black text-xs font-black px-4 py-1.5 rounded-full tracking-wider">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{plan.label}</h3>
                    {plan.name === 'INFINITY_PLUS' && (
                      <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center">
                        <Award size={14} className="text-black" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 ${plan.name === 'INFINITY_PLUS' ? 'text-neon' : 'text-neon/70'}`} />
                      <span className="text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`w-full text-center font-bold py-3.5 rounded-xl transition-all duration-200 ${plan.ctaVariant === 'filled' ? 'bg-neon text-black hover:shadow-neon-lg hover:scale-105' : plan.ctaVariant === 'outline-neon' ? 'border border-neon text-neon hover:bg-neon/10 hover:shadow-neon' : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 text-sm mt-8">
            Cancele quando quiser. Dúvidas? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">Fale com um especialista</a>.
          </p>
        </div>
      </section>

      {/* ── Pilares (no lugar de depoimentos) ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 border border-white/10 text-center hover:border-neon/30 hover:shadow-neon transition-all">
                <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={18} className="text-neon" />
                </div>
                <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-slate-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Nossos Pilares</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-3">
              Por que a <span className="gradient-text">Brasília Consultoria</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-7 border border-white/10 hover:border-neon/30 hover:shadow-neon transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon/20 to-neon-purple/20 border border-neon/20 flex items-center justify-center mb-5">
                  <p.icon size={22} className="text-neon" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 border border-neon/20 shadow-neon text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-neon-purple/10 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-6">
                <Landmark size={28} className="text-neon" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Comece a ganhar contratos com <span className="gradient-text">inteligência</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Cadastre-se gratuitamente e acesse o painel em segundos. Sem cartão de crédito.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="group flex items-center justify-center gap-2 bg-neon text-black font-bold text-base px-8 py-4 rounded-xl hover:shadow-neon-lg hover:scale-105 transition-all duration-200"
                >
                  Criar Conta Gratuita
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 glass border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-xl hover:border-white/40 transition-all duration-200"
                >
                  <MessageCircle size={18} className="text-neon" />
                  Falar com Especialista
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon to-neon-purple flex items-center justify-center">
                <Landmark size={18} className="text-black" />
              </div>
              <div>
                <span className="font-bold text-white text-sm tracking-tight">BRASÍLIA</span>
                <p className="text-neon text-[10px] font-semibold uppercase tracking-wide">Consultoria em Licitações</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/termos" className="text-slate-500 hover:text-white text-sm transition-colors">Termos de Uso</Link>
              <Link href="/privacidade" className="text-slate-500 hover:text-white text-sm transition-colors">Política de Privacidade</Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white text-sm transition-colors">WhatsApp</a>
              <Link href="/login" className="text-slate-500 hover:text-white text-sm transition-colors">Entrar</Link>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© 2026 Brasília Consultoria em Licitações. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-slate-600 text-xs">Todos os sistemas operacionais</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
