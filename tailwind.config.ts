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
        // Aspire-inspired palette
        aspire: {
          bg: '#F7F5F3',
          card: '#D8CEC8',
          taupe: '#B59D88',
          taupeDark: '#9B8470',
          navy: '#1F2A44',
          ink: '#1F2A44',
          border: '#DADADA',
          white: '#FFFFFF',
          soft: '#EFEAE5',
          mist: '#ECE6E0',
        },
        ivory: {
          50: '#F7F5F3',
          100: '#EFEAE5',
          200: '#E4DCD3',
        },
        navy: {
          50: '#EEF1F6',
          100: '#D3DBE7',
          500: '#3D4A66',
          700: '#28344C',
          900: '#1F2A44',
        },
        gold: {
          300: '#E6CD8A',
          400: '#D4B66A',
          500: '#B59D88',
          600: '#9B8470',
        },
        sage: {
          500: '#7A8C73',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '"SF Pro Display"', '"Helvetica Neue"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'swiss': '0.18em',
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(31, 42, 68, 0.08)',
        'lift': '0 12px 40px -12px rgba(31, 42, 68, 0.18)',
        'card': '0 2px 12px -4px rgba(31, 42, 68, 0.06)',
        'float': '0 24px 60px -20px rgba(31, 42, 68, 0.22)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'shimmer': 'shimmer 2.4s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'ticker': 'ticker 28s linear infinite',
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
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
