import {Inter, JetBrains_Mono} from "next/font/google";
import "@/app/globals.css";

// FontAwesome Config
import {config} from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrains_mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

// Auth0
import {UserProvider} from "@auth0/nextjs-auth0/client";

export const metadata = {
    title: "CodeNest",
    description: "A fully-featured, web-based coding environment",
};

export default function RootLayout({children}) {
    return (
        <>
            <html
                lang="en"
                className={`${inter.variable} ${jetbrains_mono.variable}`}
            >
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                <UserProvider>{children}</UserProvider>
            </html>
        </>
    );
}
