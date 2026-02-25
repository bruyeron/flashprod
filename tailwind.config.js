/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        // --- C'est ici que tu définis tes couleurs personnalisées ---
        
        // Couleurs principales
        bg: 'var(--bg)',
        'bg-2': 'var(--bg2)',
        'bg-3': 'var(--bg3)',
        'bg-4': 'var(--bg4)',
        
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        
        // --- LES COULEURS KPI QUI TE MANQUENT ---
        // Tailwind va maintenant comprendre "text-green" et "bg-green-bg"
        green: 'var(--green)',       
        'green-bg': 'var(--green-bg)', 
        
        orange: 'var(--orange)',
        'orange-bg': 'var(--orange-bg)',
        
        red: 'var(--red)',
        'red-bg': 'var(--red-bg)',
        
        // Fonds tableaux
        section: 'var(--section-bg)',
        total: 'var(--total-bg)',
        'month-total': 'var(--month-total-bg)',
      },
      fontSize: {
        'xxs': '0.65rem', // Texte très petit pour le tableau
      }
    },
  },
  plugins: [],
}