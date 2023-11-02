"use client"

import { useEffect, useRef, useState } from "react"

function setTerminalTheme(colorscheme, terminal) {
    if (colorscheme == "dark") {
        const darkBg = getComputedStyle(
            document.documentElement
        ).getPropertyValue("--dark-bg-1")
        const darkFg = getComputedStyle(
            document.documentElement
        ).getPropertyValue("--dark-fg-1")
        terminal.options.theme = {
            background: darkBg,
            foreground: darkFg,
            cursor: darkFg,
        }
    } else {
        const lightBg = getComputedStyle(
            document.documentElement
        ).getPropertyValue("--light-bg-1")
        const lightFg = getComputedStyle(
            document.documentElement
        ).getPropertyValue("--light-fg-1")
        terminal.options.theme = {
            background: lightBg,
            foreground: lightFg,
            cursor: lightFg,
        }
    }
}

export default function ExampleCloudShell() {
    const termRef = useRef(null)
    const themeChangeRef = useRef(null)

    // Listen to changes in the theme
    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "data-theme"
                ) {
                    // The 'theme' attribute on the HTML tag has changed, so dispatch a custom event
                    const themeChangeEvent = new CustomEvent("themechange", {
                        detail: mutation.target.getAttribute("data-theme"),
                    })
                    window.dispatchEvent(themeChangeEvent)
                }
            }
        })

        // Start observing changes in the 'theme' attribute of the HTML tag
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        })

        // Clean up the observer when the component unmounts
        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        const initTerminal = async () => {
            // Initialize Xterm.js and addons
            const { Terminal } = await import("xterm")
            const { FitAddon } = await import("xterm-addon-fit")
            const terminal = new Terminal({
                cursorBlink: true,
                cols: 25,
                rows: 45,
                fontFamily: "var(--font-jetbrains-mono)",
                theme: {
                    background: "#000000",
                    foreground: "#ffffff",
                    cursor: "#ffffff",
                },
            })
            const fitAddon = new FitAddon()
            terminal.loadAddon(fitAddon)

            // Create a WebSocket connection to your EC2 instance
            // const ec2Instance =
            //     "ec2-13-52-80-90.us-west-1.compute.amazonaws.com"
            // const port = "8765"
            // const socket = new WebSocket(`ws://${ec2Instance}:${port}`)
            const socket = new WebSocket(`ws://localhost:6060`)

            // Open the terminal in the 'terminal-container' div
            terminal.open(termRef.current)
            fitAddon.fit()

            // Listen for the custom 'themechange' event
            const handleThemeChange = (event) => {
                console.log("Theme changed to:", event.detail)
                const currentTheme = event.detail
                setTerminalTheme(currentTheme, terminal)
            }

            themeChangeRef.current = handleThemeChange
            window.addEventListener("themechange", handleThemeChange)

            // Get initial theme
            const currentTheme =
                document.documentElement.getAttribute("data-theme")
            setTerminalTheme(currentTheme, terminal)

            // Resize window in resize
            window.addEventListener("resize", () => {
                fitAddon.fit()
            })

            // Attach the WebSocket to Xterm.js
            terminal.onData((data) => {
                fitAddon.fit()
                socket.send(data)
            })

            // Handle WebSocket messages
            socket.onmessage = (event) => {
                terminal.write(event.data)
            }

            // Clean up the terminal and close the WebSocket on component unmount
            return () => {
                window.removeEventListener("resize", () => {
                    fitAddon.fit()
                })
                window.removeEventListener(
                    "themechange",
                    themeChangeRef.current
                )
                socket.close()
            }
        }
        initTerminal()
    }, [])

    return (
        <div className="p-3 flex flex-col w-full h-full">
            <div ref={termRef}></div>
        </div>
    )
}
