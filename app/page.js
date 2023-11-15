"use client"

import Footer from "@/components/homepage/footer"
import GetStartedHero from "@/components/homepage/hero/getstartedhero"
import HeroOne from "@/components/homepage/hero/heroone"
import HeroThree from "@/components/homepage/hero/herothree"
import HeroTwo from "@/components/homepage/hero/herotwo"
import IntroHero from "@/components/homepage/hero/introhero"
import TopBar from "@/components/homepage/topbar"

export default function HomePage() {
    return (
        <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]">
            <TopBar />
            <IntroHero />
            <HeroOne />
            <HeroTwo />
            <HeroThree />
            <GetStartedHero />
            <Footer />
        </body>
    )
}
