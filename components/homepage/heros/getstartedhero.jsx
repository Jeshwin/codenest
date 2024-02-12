import Link from "next/link";

export default function GetStartedHero() {
    return (
        <div className="h-[50vh] flex place-items-center bg-gradient-to-t from-[var(--bg-1)] via-[var(--bg-2)] to-[var(--bg-3)] text-[var(--fg-1)]">
            <div className="w-2/3 h-full mx-auto flex flex-col justify-center items-center place-items-center">
                <span className="text-5xl mb-10">Get Started Today!</span>
                <Link href="/codespace">
                    <button className="px-4 py-3 font-mono text-xl bg-[var(--accent)] rounded-xl duration-300 hover:brightness-110 hover:scale-110 focus:scale-90">
                        Enter CodeNest
                    </button>
                </Link>
            </div>
        </div>
    );
}
