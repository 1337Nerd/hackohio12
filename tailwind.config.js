/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        openModal: '.2s ease-in forwards openmodal',
        closeModal: '.2s ease-out forwards closemodal'
      },
      colors: {
        'modal-shadow': '#70707057'
      },
      keyframes: {
        openmodal: {
          '0%': { opacity: 0, transform: 'translateY(1rem)' },
        },
        closemodal: {
          'to': { opacity: 0, transform: 'translateY(1rem)' }
        }
      }
    },
  },
  plugins: [],
}