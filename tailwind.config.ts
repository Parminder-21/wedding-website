import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary luxury wedding palette
        ivory:       '#FAF7F2',
        champagne:   '#F5E6C8',
        gold: {
          50:  '#FDF9EE',
          100: '#FAF0D4',
          200: '#F3D98A',
          300: '#E8C547',
          400: '#D4A817',
          500: '#C9A84C',
          600: '#B8941E',
          700: '#9A7A14',
          800: '#7A5F0E',
          900: '#5C470A',
        },
        maroon: {
          50:  '#FDF2F2',
          100: '#FCE4E4',
          200: '#F9BABA',
          300: '#F38080',
          400: '#E04747',
          500: '#8B1A1A',
          600: '#7A1515',
          700: '#641111',
          800: '#4E0D0D',
          900: '#3A0A0A',
        },
        rose: {
          blush:   '#F2D4CE',
          beige:   '#EDD5C5',
          warm:    '#C9826B',
        },
        emerald: {
          deep:    '#1A4A3A',
          mid:     '#2D7A5E',
          accent:  '#4CAF80',
        },
        // Admin UI
        slate: {
          850: '#1A1F2E',
          900: '#0F1117',
          950: '#070A10',
        },
      },
      fontFamily: {
        display:  ['var(--font-display)', 'Georgia', 'serif'],
        serif:    ['var(--font-serif)', 'Georgia', 'serif'],
        body:     ['var(--font-body)', 'system-ui', 'sans-serif'],
        hindi:    ['Tiro Devanagari Hindi', 'serif'],
      },
      fontSize: {
        '7xl':  ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '8xl':  ['6rem',    { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        '9xl':  ['8rem',    { lineHeight: '1',    letterSpacing: '-0.03em' }],
        '10xl': ['10rem',   { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C9A84C 0%, #F3D98A 40%, #C9A84C 60%, #9A7A14 100%)',
        'maroon-gradient':  'linear-gradient(135deg, #8B1A1A 0%, #C94040 50%, #8B1A1A 100%)',
        'ivory-gradient':   'linear-gradient(180deg, #FAF7F2 0%, #F5E6C8 100%)',
        'dark-gradient':    'linear-gradient(180deg, #1A0A0A 0%, #2D1515 50%, #1A0A0A 100%)',
        'hero-overlay':     'linear-gradient(180deg, rgba(10,5,2,0.3) 0%, rgba(10,5,2,0.7) 60%, rgba(10,5,2,0.95) 100%)',
      },
      boxShadow: {
        'gold':      '0 4px 24px rgba(201,168,76,0.25), 0 1px 4px rgba(201,168,76,0.15)',
        'gold-lg':   '0 8px 48px rgba(201,168,76,0.35), 0 2px 8px rgba(201,168,76,0.2)',
        'maroon':    '0 4px 24px rgba(139,26,26,0.3)',
        'luxury':    '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
        'card':      '0 2px 20px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        'glass':     'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)',
      },
      animation: {
        'petal-fall':    'petalFall var(--duration, 8s) ease-in infinite var(--delay, 0s)',
        'shimmer':       'shimmer 2.5s ease-in-out infinite',
        'fade-up':       'fadeUp 0.8s ease forwards',
        'flip-number':   'flipNumber 0.4s ease forwards',
        'pulse-gold':    'pulseGold 2s ease-in-out infinite',
        'rotate-slow':   'rotateSlow 20s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'curtain-open':  'curtainOpen 1.5s cubic-bezier(0.76,0,0.24,1) forwards',
      },
      keyframes: {
        petalFall: {
          '0%':   { transform: 'translateY(-5%) rotate(0deg) translateX(0)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '0.6' },
          '100%': { transform: 'translateY(110vh) rotate(720deg) translateX(60px)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flipNumber: {
          '0%':   { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
        rotateSlow: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-15px)' },
        },
        curtainOpen: {
          '0%':   { transform: 'scaleY(1)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'top' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      screens: {
        'xs': '375px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}

export default config
