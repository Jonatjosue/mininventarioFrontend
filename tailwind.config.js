/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2a519b', // azul corporativo
        secondary: '#f59e34', // naranja
        white: '#ffffff', // blanco
        pink: '#cd46c0', // rosa
        warning: '#ffc107', // amarillo
      },
      backgroundImage: {
        'gradiente-personal': `
      radial-gradient(circle at 20% 30%, rgba(42,81,155,0.4), transparent 25%),
      radial-gradient(circle at 80% 20%, rgba(205,70,192,0.4), transparent 35%),
      radial-gradient(circle at 50% 80%, rgba(245,158,52,0.4), transparent 40%)
    `,
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'fade-in-down': {
          '0%': { opacity: 0, transform: 'translate3d(0, -100%, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in-left': {
          '0%': { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in-right': {
          '0%': { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        'fade-out-down': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
        },
        'fade-out-up': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translate3d(0, -100%, 0)' },
        },
        'fade-out-left': {
          '0%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          '100%': { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
        },
        'fade-out-right': {
          '0%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          '100%': { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
        },
        'fade-out-top-left': {
          '0%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          '100%': { opacity: 0, transform: 'translate3d(-100%, -100%, 0)' },
        },
        'fade-out-top-right': {
          /* Added missing fade-out-top-right animation */
          '0%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          '100%': { opacity: 0, transform: 'translate3d(100%, -100%, 0)' },
        },
      },
      animation: {
        fadein: 'fade-in 3s ease-in-out infinite',
        fadeout: 'fade-out 3s ease-out infinite',
        fadeindown: 'fade-in-down 3s ease-in infinite',
        fadeinup: 'fade-in-up 3s ease-in-out infinite',
        fadeinleft: 'fade-in-left 3s ease-in-out infinite',
        fadeinright: 'fade-in-right 3s ease-in-out infinite',
        fadeoutdown: 'fade-out-down 5s ease-in-out infinite',
        fadeoutup: 'fade-out-up 3s ease-in-out infinite',
        fadeoutleft: 'fade-out-left 3s ease-in-out infinite',
        fadeoutright: 'fade-out-right 3s ease-in-out infinite',
        fadeouttopleft:
          'fade-out-top-left 3s ease-in-out infinite' /* Added animation for fade-out-top-left */,
        fadeouttopright:
          'fade-out-top-right 3s ease-in-out infinite' /* Added animation for fade-out-top-right */,
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2a519b',
          secondary: '#f59e34',
          accent: '#cd46c0',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          warning: '#ffc107',
        },
      },
    ],
  },
};
