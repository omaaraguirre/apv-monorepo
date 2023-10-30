/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.jsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6800E8',
        secondary: '#37009E',
        red: '#BD000F',

        lighter: '#FFFFFF',
        light: '#E5E6EB',
        medium: '#3B3B3B',
        dark: '#25282A',
        darker: '#181A1B'
      }
    }
  },
  plugins: []
}
