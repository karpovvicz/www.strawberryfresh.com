/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'glass-bg-move': 'glass-bg-move 24s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': {transform: 'translateY(0px)'},
                    '50%': {transform: 'translateY(-10px)'},
                },
                glow: {
                    '0%, 100%': {boxShadow: '0 0 20px rgba(255, 119, 198, 0.3)'},
                    '50%': {boxShadow: '0 0 40px rgba(255, 119, 198, 0.6)'},
                },
                'glass-bg-move': {
                    '0%': {backgroundPosition: '0% 50%'},
                    '100%': {backgroundPosition: '100% 50%'},
                },
            },
            backdropBlur: {
                'xs': '2px',
            },
            colors: {
                glass: {
                    white: 'rgba(255, 255, 255, 0.2)',
                    dark: 'rgba(0, 0, 0, 0.2)',
                },
            },
            boxShadow: {
                'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
                'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
            },
            fontFamily: {
                strawberry: ['StrawberryBubble', 'sans-serif'],
            },
        },
    },
    plugins: [],
}