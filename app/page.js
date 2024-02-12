"use client";

import Footer from "@/components/homepage/footer";
import GetStartedHero from "@/components/homepage/heros/getstartedhero";
import HeroOne from "@/components/homepage/heros/heroone";
import HeroThree from "@/components/homepage/heros/herothree";
import HeroTwo from "@/components/homepage/heros/herotwo";
import IntroHero from "@/components/homepage/heros/introhero";
import TopBar from "@/components/homepage/topbar";

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
