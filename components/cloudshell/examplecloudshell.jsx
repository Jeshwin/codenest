"use client"

import { useEffect } from "react"

export default function ExampleCloudShell() {
    useEffect(() => {
        const initTerminal = async () => {
            // Initialize Xterm.js and addons
            const { Terminal } = await import("xterm")
            const { FitAddon } = await import("xterm-addon-fit")
            const terminal = new Terminal({
                cursorBlink: true,
            })
            const fitAddon = new FitAddon()

            // Create a WebSocket connection to your EC2 instance
            // const ec2Instance =
            //     "ec2-13-52-80-90.us-west-1.compute.amazonaws.com"
            // const port = "8765"
            // const socket = new WebSocket(`ws://${ec2Instance}:${port}`)
            const socket = new WebSocket(`ws://localhost:6060`)

            terminal.loadAddon(fitAddon)

            // Open the terminal in the 'terminal-container' div
            terminal.open(document.getElementById("terminal-container"))
            fitAddon.fit()

            // Attach the WebSocket to Xterm.js
            terminal.onData((data) => {
                console.log("Received event: " + data + "<-")
                socket.send(data)
            })

            // Handle WebSocket messages
            socket.onmessage = (event) => {
                terminal.write(event.data)
            }

            // Clean up the terminal and close the WebSocket on component unmount
            return () => {
                terminal.dispose()
                socket.close()
            }
        }
        initTerminal()
    }, [])

    return <div id="terminal-container"></div>
}
