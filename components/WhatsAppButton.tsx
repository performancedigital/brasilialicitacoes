'use client'

const WHATSAPP = '5531987551055'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Olá! Preciso de ajuda com licitações na Brasília Consultoria.'
)}`

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/30 hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.383 3 4 8.383 4 15.004c0 2.115.553 4.18 1.602 6.004L4 29l8.184-1.57a11.94 11.94 0 0 0 3.82.63h.001C22.626 28.06 28 22.677 28 16.056 28 9.435 22.626 4.06 16.004 3zm0 21.93h-.001a9.9 9.9 0 0 1-3.49-.64l-.25-.094-4.857.932.95-4.735-.163-.243a9.86 9.86 0 0 1-1.49-5.246c0-5.467 4.45-9.917 9.92-9.917 2.65 0 5.14 1.034 7.01 2.91a9.84 9.84 0 0 1 2.9 7.012c0 5.467-4.45 9.917-9.93 9.917zm5.45-7.43c-.298-.15-1.764-.87-2.038-.97-.273-.1-.472-.15-.67.15-.198.297-.768.967-.942 1.165-.173.198-.347.223-.644.075-.298-.15-1.26-.464-2.4-1.48-.887-.79-1.485-1.766-1.66-2.064-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.15-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.612-.918-2.207-.242-.58-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.764-.721 2.013-1.417.248-.696.248-1.293.173-1.417-.074-.124-.272-.198-.57-.347z" />
      </svg>
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
    </a>
  )
}
