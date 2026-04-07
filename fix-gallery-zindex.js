const fs = require('fs')

// Bug: a div "absolute inset-0 bg-forest-deep" fica em cima da <img>
// pois vem depois no DOM. A imagem (em fluxo normal) fica atrás do elemento posicionado.
// Fix: imagem recebe absolute inset-0 z-10, placeholder fica z-0 (atrás), hover overlay z-20

const content = `import { useState } from "react"
import { GALLERY } from "@/data/content"
import type { GalleryItem } from "@/types"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

function loadGalleryData(): GalleryItem[] {
  try {
    const s = localStorage.getItem('barbeza-gallery')
    return s ? (JSON.parse(s) as GalleryItem[]) : GALLERY
  } catch { return GALLERY }
}

const CATS = [
  { key: "all",       label: "Todos"    },
  { key: "cortes",    label: "Cortes"   },
  { key: "barbas",    label: "Barbas"   },
  { key: "ambiente",  label: "Ambiente" },
]

export function GallerySection() {
  const [cat, setCat] = useState("all")
  const { ref, isVisible } = useScrollAnimation(0.1)
  const gallery = loadGalleryData()
  const filtered = cat === "all" ? gallery : gallery.filter((g: GalleryItem) => g.category === cat)

  return (
    <section id="galeria" className="section-padding bg-natural">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Nosso trabalho</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Galeria</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
          {CATS.map(c => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={\`font-inter text-xs tracking-wider px-5 py-2 rounded-full border transition-all duration-200 \${
                c.key === cat
                  ? "bg-forest text-white border-forest"
                  : "border-natural-border text-ink-muted hover:border-forest hover:text-forest"
              }\`}>
              {c.label}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item: GalleryItem, i: number) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-forest/10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "scale(0.95)",
                transition: \`all 0.5s ease \${i * 80}ms\`,
              }}
            >
              {/* Placeholder — fica ATRÁS (z-0), visível apenas quando a imagem falha */}
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-forest/8">
                <div className="text-center p-4">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-forest/30 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p className="font-inter text-forest/30 text-[9px]">{item.alt}</p>
                </div>
              </div>

              {/* Imagem — fica NA FRENTE (z-10), cobre o placeholder quando carrega */}
              <img
                src={item.file}
                alt={item.alt}
                className="absolute inset-0 z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Esconde a imagem, deixa o placeholder aparecer
                  (e.target as HTMLImageElement).style.display = "none"
                }}
              />

              {/* Hover overlay — acima de tudo (z-20) */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-inter text-white text-xs font-medium drop-shadow">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="font-inter text-ink-muted/50 text-sm text-center py-12">
            Nenhuma foto nesta categoria.
          </p>
        )}
      </div>
    </section>
  )
}
`

fs.writeFileSync(
  'C:\\Users\\Helbert\\Documents\\Verdent\\barbeza2\\src\\components\\landing\\GallerySection.tsx',
  content,
  'utf8'
)
console.log('GallerySection.tsx corrigida — z-index da imagem ajustado')
