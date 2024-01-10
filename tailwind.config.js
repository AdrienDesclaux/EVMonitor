/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import tailwindScrollbar from 'tailwind-scrollbar';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background_dark: '#1E1E1E',
        blue_nav: '#2179d1',
        grey_block: '#454545',
        dark_grey: '#2D2D2D',
        blue_light: '#439bf3'
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2179d1',
          secondary: '#454545',
          accent: '#f97316',
          neutral: '#e0e7ff',
          'base-100': '#374151',
          info: '#fbbf24',
          success: '#00ffff',
          warning: '#f87171',
          error: '#b91c1c'
        }
      }
    ]
  },
  plugins: [daisyui, tailwindScrollbar]
};
