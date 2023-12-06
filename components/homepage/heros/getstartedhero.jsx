import Link from "next/link"

export default function GetStartedHero() {
    return (
        <div
            className="h-[50vh] flex place-items-center
        bg-gradient-to-t from-[var(--light-bg-1)] via-[var(--light-bg-2)] to-[var(--light-bg-3)]
        dark:from-[var(--dark-bg-1)] dark:via-[var(--dark-bg-2)] dark:to-[var(--dark-bg-3)]
        text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]"
        >
            <div
                className="w-2/3 h-full mx-auto flex flex-col
                justify-center items-center place-items-center"
            >
                <span className="text-5xl mb-10">Get Started Today!</span>
                <Link href="/codespace">
                    <button
                        className="px-4 py-3 font-mono text-xl
                    bg-[var(--secondary)] rounded-xl duration-300
                    hover:bg-[var(--secondary-light)] hover:dark:bg-[var(--secondary-dark)]
                    hover:scale-110 focus:scale-90"
                    >
                        Enter CodeNest
                    </button>
                </Link>
            </div>
        </div>
    )
}
