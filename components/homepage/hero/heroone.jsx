import { useEffect } from "react"
import { updateLineNumbers, readKey } from "../../editor/editorfunctions"

export default function HeroOne() {
    const examplePythonScript = `def main():
    print("Hello, CodeNest!")

if __name__ == "__main__":
    main()`

    useEffect(() => {
        document.getElementById("mytextarea").value = examplePythonScript

        document
            .getElementById("mytextarea")
            .addEventListener("input", updateLineNumbers)
        document
            .getElementById("mytextarea")
            .addEventListener("paste", updateLineNumbers)
        document
            .getElementById("mytextarea")
            .addEventListener("keydown", (e) => readKey(e))

        updateLineNumbers()
    }, [examplePythonScript])

    function handleEditorScroll() {
        document
            .getElementById("line-numbers")
            .scrollTo(0, document.getElementById("mytextarea").scrollTop)
        updateLineNumbers()
    }

    return (
        <div
            className="h-screen flex place-items-center
        bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]
        text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]"
        >
            <div
                className="w-2/3 h-96 mx-auto flex flex-row gap-4
                justify-center items-center place-items-center"
            >
                <div className="w-1/2 text-5xl text-center font-mono font-light">
                    A fully featured, web based coding environment
                </div>
                <div
                    className="w-1/2 h-80 rounded-lg
                bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]
                flex flex-col"
                >
                    <div
                        className="h-10 flex overflow-y-hidden font-mono rounded-t-lg
                        text-sm bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]"
                    >
                        <div
                            className="tab flex py-2 px-5 brightness-150
                        hover:brightness-150 bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]
                        cursor-pointer border-b-2 border-[var(--light-fg-1)] dark:border-[var(--dark-fg-1)]"
                        >
                            <span>script.py</span>
                            <span
                                class="close-tab block w-5 h-5 ml-2 p-0
                            rounded-md text-center hover:bg-[var(--bg-error)]"
                            >
                                &#66338;
                            </span>
                        </div>
                        <div
                            className="tab flex py-2 px-5 cursor-pointer
                        hover:brightness-150 bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]"
                        >
                            <span>test.py</span>
                            <span
                                class="close-tab block w-5 h-5 ml-2 p-0
                            rounded-md text-center hover:bg-[var(--bg-error)]"
                            >
                                &#66338;
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-row font-mono">
                        <div
                            id="line-numbers"
                            className="min-w-[5ch] max-w-[9ch] text-right flex-none
                            pr-[1ch] border-none outline-none rounded-bl-lg
                            overflow-hidden resize-none bg-[var(--light-bg-2)]
                            text-[var(--light-fg-1)] dark:bg-[var(--dark-bg-2)]
                            dark:text-[var(--dark-fg-1)]"
                            cols="1"
                            rows="10"
                            readOnly
                        ></div>
                        <textarea
                            id="mytextarea"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            onScroll={handleEditorScroll}
                            className="w-full h-full pl-2 border-none
                            outline-none whitespace-pre rounded-br-lg
                            overflow-wrap-normal overflow-x-scroll resize-none
                            bg-[var(--light-bg-1)] text-[var(--light-fg-1)]
                            dark:bg-[var(--dark-bg-1)] dark:text-[var(--dark-fg-1)]"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}
