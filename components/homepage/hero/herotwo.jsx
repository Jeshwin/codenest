export default function HeroTwo() {
    const exampleShell = `def main():
    print("Hello, CodeNest!")

if __name__ == "__main__":
    main()`
    return (
        <div
            className="h-screen flex place-items-center
        bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]
        text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]"
        >
            <div
                className="w-2/3 h-1/2 mx-auto flex flex-row gap-4
                justify-center items-center place-items-center"
            >
                <ul
                    className="w-1/2 h-80 p-4 font-mono rounded-lg
                bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]
                flex flex-col"
                >
                    <li>
                        <span className="text-[var(--term-green)]">
                            codenest@codenest
                        </span>
                        :<span className="text-[var(--term-blue)]">~</span>#
                        echo &quot;Hello, CodeNest&quot;
                    </li>
                    <li>Hello, CodeNest</li>
                    <li>
                        <span className="text-[var(--term-green)]">
                            codenest@codenest
                        </span>
                        :<span className="text-[var(--term-blue)]">~</span># cd
                        project
                    </li>
                    <li>
                        <span className="text-[var(--term-green)]">
                            codenest@codenest
                        </span>
                        :
                        <span className="text-[var(--term-blue)]">project</span>
                        # python script.py
                    </li>
                    <li>Hello, CodeNest!</li>
                    <li>
                        <span className="text-[var(--term-green)]">
                            codenest@codenest
                        </span>
                        :
                        <span className="text-[var(--term-blue)]">project</span>
                        # exit
                        <span className="animate-blink">|</span>
                    </li>
                </ul>
                <div className="w-1/2 text-5xl text-center font-mono font-light">
                    Remotely access your code through Cloud Shell
                </div>
            </div>
        </div>
    )
}
