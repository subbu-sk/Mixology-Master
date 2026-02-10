/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                amber: '#D4A574',
                mahogany: '#8B4513',
                cream: '#F5F5DC',
                gold: '#F4E4BC',
                charcoal: '#36454F',
                ivory: '#FFFFF0',
            },
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
                script: ['Dancing Script', 'cursive'],
            },
        },
    },
    plugins: [],
}
