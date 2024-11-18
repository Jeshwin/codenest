"use client";

import Footer from "@/src/components/homepage/footer";
import GetStartedHero from "@/src/components/homepage/heros/getstartedhero";
import HeroOne from "@/src/components/homepage/heros/heroone";
import HeroThree from "@/src/components/homepage/heros/herothree";
import HeroTwo from "@/src/components/homepage/heros/herotwo";
import IntroHero from "@/src/components/homepage/heros/introhero";
import TopBar from "@/src/components/homepage/topbar";

export default function HomePage() {
    return (
        <body className="h-screen bg-[var(--bg-3)]">
            <TopBar />
            <IntroHero />
            <HeroOne />
            <HeroTwo />
            <HeroThree />
            <GetStartedHero />
            <Footer />
        </body>
    );
}
