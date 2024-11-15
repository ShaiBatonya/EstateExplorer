/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // ציין את מיקומי הקבצים שלך
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',  
        secondary: '#1e40af', 
      },
    },
  },
  plugins: [],
};
