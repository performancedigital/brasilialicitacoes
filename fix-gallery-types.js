const fs = require('fs')

const gallerySectionContent = `import { useState } from "react"
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
  { key: "all",      label: "Todos"    },
  { key: "cortes",   label: "Cortes"   },
  { key: "barbas",   label: "Barbas"   },
  { key: "ambiente", label: "Ambiente" },
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
              }\`}>{c.label}</button>
          ))}
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item: GalleryItem, i: number) => (
            <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              style={{ opacity:isVisible?1:0, transform:isVisible?"none":"scale(0.95)", transition:\`all 0.5s ease \${i*80}ms\` }}>
              <img src={item.file} alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).style.display="none" }}/>
              <div className="absolute inset-0 bg-forest-deep flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-forest/20 border border-forest/30 flex items-center justify-center mx-auto mb-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <p className="font-inter text-white/50 text-[10px]">{item.alt}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-inter text-white text-xs font-medium">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`

fs.writeFileSync(
  'C:\\Users\\Helbert\\Documents\\Verdent\\barbeza2\\src\\components\\landing\\GallerySection.tsx',
  gallerySectionContent,
  'utf8'
)
console.log('GallerySection.tsx reescrito com tipos corretos')
