import Editor from "@/components/editor/editor"

export default function HeroOne() {
    return (
        <div
            className="h-screen flex place-items-center
        bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]
        text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]"
        >
            <div
                className="w-2/3 h-1/2 mx-auto flex flex-row gap-4
                justify-center items-center place-items-center"
            >
                <div className="w-1/2 text-5xl text-center font-mono font-light">
                    A fully featured, web based coding environment
                </div>
                <div
                    className="w-1/2 h-full rounded-lg
                bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]
                flex flex-col"
                >
                    <Editor />
                </div>
            </div>
        </div>
    )
}
