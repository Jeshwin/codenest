import {Inter, JetBrains_Mono} from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrains_mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata = {
    title: "CodeNest",
    description: "A fully-featured, web-based coding environment",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <html
                lang="en"
                className={`${inter.variable} ${jetbrains_mono.variable}`}
            >
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                {children}
            </html>
        </>
    );
}
