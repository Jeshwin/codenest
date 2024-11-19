export default function HeroTwo() {
    return (
        <div className="h-screen flex place-items-center bg-[var(--bg-1)] text-[var(--fg-1)]">
            <div className="w-2/3 h-1/2 mx-auto flex flex-row gap-4 justify-center items-center place-items-center">
                <ul className="w-1/2 h-full p-4 font-mono rounded-lg bg-[var(--bg-2)] flex flex-col">
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
    );
}
