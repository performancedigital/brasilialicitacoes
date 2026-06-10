import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Marca Brasilia Consultoria: dourado + azul-marinho.
        // (mantemos os nomes 'neon'/'neon-purple' usados no app, mudando so os valores)
        neon: '#D4AF37',          // dourado (acento primario)
        'neon-purple': '#1E4488', // azul-marinho (acento secundario)
        gold: '#D4AF37',
        navy: '#1E4488',
        dark: {
          DEFAULT: '#000000',
          800: '#0A0A0A',
          700: '#111111',
          600: '#1A1A1A',
          500: '#222222',
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(212,175,55,0.30)',
        'neon-lg': '0 0 40px rgba(212,175,55,0.45)',
        'neon-purple': '0 0 20px rgba(30,68,136,0.35)',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
        'gradient-neon': 'linear-gradient(135deg, #D4AF37 0%, #1E4488 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}

export default config
