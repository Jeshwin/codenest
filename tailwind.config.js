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
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "rgb(var(--background))",
                foreground: "rgb(var(--foreground))",
                card: {
                    DEFAULT: "rgb(var(--card))",
                    foreground: "rgb(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "rgb(var(--popover))",
                    foreground: "rgb(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "rgb(var(--primary))",
                    foreground: "rgb(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "rgb(var(--secondary))",
                    foreground: "rgb(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "rgb(var(--muted))",
                    foreground: "rgb(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "rgb(var(--accent))",
                    foreground: "rgb(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "rgb(var(--destructive))",
                    foreground: "rgb(var(--destructive-foreground))",
                },
                border: "rgb(var(--border))",
                input: "rgb(var(--input))",
                ring: "rgb(var(--ring))",
                toggle: "rgb(var(--toggle))",
                sidebar: {
                    DEFAULT: "rgb(var(--sidebar-background))",
                    foreground: "rgb(var(--sidebar-foreground))",
                    primary: "rgb(var(--sidebar-primary))",
                    "primary-foreground":
                        "rgb(var(--sidebar-primary-foreground))",
                    accent: "rgb(var(--sidebar-accent))",
                    "accent-foreground":
                        "rgb(var(--sidebar-accent-foreground))",
                    border: "rgb(var(--sidebar-border))",
                    ring: "rgb(var(--sidebar-ring))",
                },
            },
            keyframes: {
                "caret-blink": {
                    "0%,70%,100%": {
                        opacity: "1",
                    },
                    "20%,50%": {
                        opacity: "0",
                    },
                },
                blink: {
                    "50%": {
                        opacity: "0",
                    },
                },
            },
            animation: {
                "caret-blink": "caret-blink 1.25s ease-out infinite",
                blink: "blink 1s infinite steps(1)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
