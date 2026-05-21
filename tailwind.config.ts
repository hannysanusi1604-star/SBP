import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FBF9F5',
          100: '#F6F2EA',
          200: '#EDE6D6',
        },
        navy: {
          50: '#EEF1F6',
          100: '#D3DBE7',
          500: '#243B5C',
          700: '#15263F',
          900: '#0A1729',
        },
        gold: {
          300: '#E6CD8A',
          400: '#D4B66A',
          500: '#B89855',
          600: '#9A7E3F',
        },
        sage: {
          500: '#7A8C73',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'swiss': '0.18em',
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(20, 38, 63, 0.08)',
        'lift': '0 12px 40px -12px rgba(20, 38, 63, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'shimmer': 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
