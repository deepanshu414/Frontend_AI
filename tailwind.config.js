/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'assistant-blue': '#4169ff',
        'activity-green': '#4DE879',
        'chart-yellow': '#FFC107',
        'chart-cyan': '#00BCD4',
        'panel-bg': '#1c295a',
        'main-bg': '#081033',
      },
      spacing: {
        '120': '30rem',
      },
      borderWidth: {
        '3': '3px',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%': { 
            transform: 'scale(0.8)',
            opacity: '0.7',
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        float: {
          '0%': { 
            transform: 'translateY(0) rotate(0deg)',
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(180deg)',
          },
          '100%': { 
            transform: 'translateY(0) rotate(360deg)',
          },
        },
        fadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        wave: {
          '0%, 100%': { 
            height: '10px',
          },
          '50%': { 
            height: '30px',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'spin-slower': 'spin 8s linear infinite reverse',
        'spin-slowest': 'spin 10s linear infinite',
        'float': 'float 30s infinite linear',
        'wave': 'wave 1.2s infinite ease-in-out',
        'fade-in': 'fadeIn 0.5s forwards',
      },
      boxShadow: {
        'glow-green': '0 0 10px rgba(77, 232, 121, 0.7)',
        'glow-blue': '0 0 10px rgba(65, 105, 255, 0.7)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],

}