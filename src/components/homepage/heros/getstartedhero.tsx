import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function GetStartedHero() {
    return (
        <div className="h-[50vh] flex place-items-center bg-gradient-to-b from-background via-accent to-muted">
            <div className="w-2/3 h-full mx-auto flex flex-col justify-center items-center place-items-center">
                <span className="text-5xl font-mono mb-10">
                    Get Started Today!
                </span>
                <Link href="/codespace">
                    <Button size="lg">Enter CodeNest</Button>
                </Link>
            </div>
        </div>
    );
}
