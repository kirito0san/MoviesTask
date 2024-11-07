/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'main-bg': '#EEF3E6',
  			'sec-bg': '#9c5f22',
  			'btn-bg': '#B43E6E',
  			'brn2-bg': '#898FB9'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}