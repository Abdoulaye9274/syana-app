/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Backgrounds
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-card': 'var(--bg-card)',
                'bg-card-hover': 'var(--bg-card-hover)',
                'border-primary': 'var(--border-primary)',

                // Accents
                'cyan': '#00D4FF',
                'violet': '#A855F7',
                'rose': '#EC4899',

                // Textes
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
                'gradient-card': 'linear-gradient(135deg, #00D4FF 0%, #A855F7 50%, #EC4899 100%)',
            },
            borderRadius: {
                'card': '12px',
                'button': '8px',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
