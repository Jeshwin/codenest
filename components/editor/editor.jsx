"use client"

import { useEffect, useRef } from "react"
import { updateLineNumbers, readKey } from "./editorfunctions"
import { TabData } from "./testdata"

export default function Editor() {
    const currentTab = useRef(0)
    const tabs = useRef(TabData)

    useEffect(() => {
        document.getElementById("mytextarea").value =
            "This\nis\nthe\nstarting\n    info"

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

        return () => {
            document
                .getElementById("mytextarea")
                .removeEventListener("input", updateLineNumbers)
            document
                .getElementById("mytextarea")
                .removeEventListener("paste", updateLineNumbers)
            document
                .getElementById("mytextarea")
                .removeEventListener("keydown", (e) => readKey(e))
        }
    }, [])

    useEffect(() => {
        const editorTextArea = document.getElementById("mytextarea")

        for (var i = 0; i < tabs.current.length; i++) {
            var tab = document.createElement("div")

            tab.innerHTML = `<span>Tab1.css</span><span class="close-tab block w-5 h-5 ml-2 p-0 rounded-md text-center hover:bg-[var(--bg-error)]">&#66338;</span>`
            tab.setAttribute("name", i)
            tab.firstChild.setAttribute("name", i)
            tab.children[1].setAttribute("name", i)
            tab.className =
                "tab flex h-min py-2 px-5 hover:brightness-150 bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)] cursor-pointer"
            tab.firstChild.innerHTML = tabs.current[i].filename

            document.getElementById("menubar").appendChild(tab)

            tab.addEventListener("click", function (e) {
                if (currentTab.current == e.target.getAttribute("name")) return
                tabs.current[currentTab.current].cursorStart =
                    editorTextArea.selectionStart
                tabs.current[currentTab.current].cursorEnd =
                    editorTextArea.selectionEnd
                tabs.current[currentTab.current].content = editorTextArea.value

                editorTextArea.value =
                    tabs.current[e.target.getAttribute("name")].content
                editorTextArea.blur()
                editorTextArea.focus()
                editorTextArea.selectionStart =
                    tabs.current[e.target.getAttribute("name")].cursorStart
                editorTextArea.selectionEnd =
                    tabs.current[e.target.getAttribute("name")].cursorEnd
                currentTab.current = e.target.getAttribute("name")
                var allTabs = document.getElementsByClassName("tab")
                for (var i = 0; i < allTabs.length; i++) {
                    // allTabs[i].classList.remove("selected-tab")
                    allTabs[i].classList.remove("brightness-150")
                }
                if (e.target.parentNode.className.includes("tab")) {
                    // e.target.parentNode.classList.add("selected-tab")
                    e.target.parentNode.classList.add("brightness-150")
                } else {
                    // e.target.classList.add("selected-tab")
                    e.target.classList.add("brightness-150")
                }
            })

            tab.children[1].addEventListener("click", function (e) {
                e.target.parentNode.firstChild.value
                e.target.parentNode.remove()
            })
        }
        document
            .getElementById("menubar")
            .firstChild.classList.add("brightness-150")
        editorTextArea.value = tabs.current[currentTab.current].content
    }, [])

    function handleEditorScroll() {
        document
            .getElementById("line-numbers")
            .scrollTo(0, document.getElementById("mytextarea").scrollTop)
        updateLineNumbers()
    }

    return (
        <>
            <div
                id="menubar"
                className="h-9 flex font-mono text-sm bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)] overflow-x-scroll"
            ></div>
            <div id="wrapper" className="w-full h-full flex font-mono">
                <textarea
                    id="line-numbers"
                    className=" min-w-[5ch] max-w-[9ch] text-right flex-none pr-[1ch] border-none outline-none rounded-bl-lg overflow-hidden resize-none bg-[var(--light-bg-2)] text-[var(--light-fg-1)] dark:bg-[var(--dark-bg-2)] dark:text-[var(--dark-fg-1)]"
                    cols="1"
                    rows="10"
                    readOnly
                ></textarea>
                <textarea
                    id="mytextarea"
                    onScroll={handleEditorScroll}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full pl-2 border-none outline-none whitespace-pre rounded-br-lg overflow-wrap-normal overflow-x-scroll resize-none bg-[var(--light-bg-1)] text-[var(--light-fg-1)] dark:bg-[var(--dark-bg-1)] dark:text-[var(--dark-fg-1)]"
                ></textarea>
            </div>
        </>
    )
}
