import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Brasília Consultoria em Licitações | Inteligência em Licitações Públicas',
  description:
    'Encontre, analise e acompanhe licitações públicas de todo o Brasil (PNCP) com inteligência artificial. Segurança, estratégia, excelência e resultados.',
  keywords: [
    'licitação',
    'consultoria em licitações',
    'pregão eletrônico',
    'PNCP',
    'edital',
    'inteligência artificial',
    'IA licitação',
  ],
  openGraph: {
    title: 'Brasília Consultoria em Licitações',
    description:
      'Encontre, analise e acompanhe licitações públicas de todo o Brasil com inteligência artificial.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
