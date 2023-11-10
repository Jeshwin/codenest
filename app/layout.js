import { Inter, JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"

// FontAwesome Config
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

const jetbrains_mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
})

export const metadata = {
    title: "CodeNest",
    description: "A fully-featured, web-based coding environment",
}

export default function RootLayout({ children }) {
    return (
        <>
            <html
                lang="en"
                className={`${inter.variable} ${jetbrains_mono.variable}`}
            >
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]">
                    {children}
                </body>
            </html>
        </>
    )
}
