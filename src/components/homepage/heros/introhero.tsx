import TypewriterText from "@/components/common/typewritertext";
import Link from "next/link";
import StyleCanvas from "@/components/homepage/style/stylecanvas";
import {Button} from "@/components/ui/button";
import {ArrowDown} from "lucide-react";
import Logo from "@/components/common/logo";

export default function IntroHero() {
    return (
        <div>
            <div className="z-10 absolute w-screen h-screen grid grid-cols-1 gap-y-8 place-content-center">
                <div className="w-2/3 mx-auto pt-10 flex flex-row justify-center items-end place-items-center">
                    <div className="size-32">
                        <Logo size={32} />
                    </div>
                    <TypewriterText text={"CodeNest"} />
                </div>
                <Link href="/codespace" className="w-fit mx-auto">
                    <Button size="lg">Get Started!</Button>
                </Link>
                <div className="w-auto mx-auto mt-4">
                    <ArrowDown className="size-8 animate-bounce z-10" />
                </div>
            </div>
            <StyleCanvas />
        </div>
    );
}
