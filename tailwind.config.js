/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class", '[data-theme="dark"]'],
    important: true,
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "Helvetica"],
                mono: ["var(--font-jetbrains-mono)", "ui-monospace"],
            },
        },
    },
    plugins: [],
};
