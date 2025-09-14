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
