"use client";

import Footer from "@/components/homepage/footer";
import GetStartedHero from "@/components/homepage/heros/getstartedhero";
import HeroOne from "@/components/homepage/heros/heroone";
import HeroThree from "@/components/homepage/heros/herothree";
import HeroTwo from "@/components/homepage/heros/herotwo";
import IntroHero from "@/components/homepage/heros/introhero";

export default function HomePage() {
    return (
        <>
            <IntroHero />
            <HeroOne />
            <HeroTwo />
            <HeroThree />
            <GetStartedHero />
            <Footer />
        </>
    );
}
