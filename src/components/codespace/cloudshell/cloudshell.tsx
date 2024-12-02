"use client";

import {useContext, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {ProjectContext} from "../projectContext";

const baseTheme = {
    black: "#64748b",
    red: "#ec4899",
    green: "#84cc16",
    yellow: "#eab308",
    blue: "#3b82f6",
    magenta: "#d946ef",
    cyan: "#06b6d4",
    white: "#f8fafc",
    brightBlack: "#64748b",
    brightRed: "#ec4899",
    brightGreen: "#84cc16",
    brightYellow: "#eab308",
    brightBlue: "#3b82f6",
    brightMagenta: "#d946ef",
    brightCyan: "#06b6d4",
    brightWhite: "#f8fafc",
};

function setTerminalTheme(colorscheme, terminal) {
    if (colorscheme == "dark") {
        const darkBg = `rgb(${getComputedStyle(
            document.documentElement
        ).getPropertyValue("--background")})`;
        const darkFg = `rgb(${getComputedStyle(
            document.documentElement
        ).getPropertyValue("--foreground")})`;
        terminal.options.theme = {
            ...baseTheme,
            background: darkBg,
            foreground: darkFg,
            cursor: darkFg,
        };
    } else {
        const lightBg = `rgb(${getComputedStyle(
            document.documentElement
        ).getPropertyValue("--background")})`;
        const lightFg = `rgb(${getComputedStyle(
            document.documentElement
        ).getPropertyValue("--foreground")})`;
        terminal.options.theme = {
            ...baseTheme,
            background: lightBg,
            foreground: lightFg,
            cursor: lightFg,
        };
    }
}

export default function CloudShell({tabId}) {
    const {socket} = useContext(ProjectContext);
    const [shellError, setShellError] = useState<string | null>(null);

    const termRef = useRef(null);
    const themeChangeRef = useRef(null);

    // Listen to changes in the theme
    useEffect(() => {
        const observer = new MutationObserver(() => {
            // The 'theme' attribute on the HTML tag has changed, so dispatch a custom event
            const themeChangeEvent = new CustomEvent("themechange", {
                detail: document.documentElement.getAttribute("data-theme"),
            });
            window.dispatchEvent(themeChangeEvent);
        });

        // Start observing changes in the 'theme' attribute of the HTML tag
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        // Clean up the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const initTerminal = async () => {
            // Check window dimensions
            const containerHeight =
                document.getElementById("custom-terminal-container")
                    .clientHeight - 8; // -8 for margin
            const defaultTextHeight = 16 + 4; // in pixels, +4 for spacing
            var terminalRows = Math.floor(
                containerHeight / defaultTextHeight - 1
            );

            // Initialize Xterm.js and addons
            const {Terminal} = await import("xterm");
            const {FitAddon} = await import("xterm-addon-fit");
            const terminal = new Terminal({
                cursorBlink: true,
                cols: 25,
                rows: terminalRows,
                fontFamily: "var(--font-jetbrains-mono)",
                theme: {
                    ...baseTheme,
                    background: "#000000",
                    foreground: "#ffffff",
                    cursor: "#ffffff",
                },
            });
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);

            // Open the terminal in the 'terminal-container' div
            terminal.open(termRef.current);
            fitAddon.fit();
            // Resize shell on the back end
            const dimensions = {cols: terminal.cols, rows: terminal.rows};
            socket.emit("terminalResize", {
                id: tabId,
                dimensions: dimensions,
            });

            // Listen for the custom 'themechange' event
            const handleThemeChange = (event) => {
                const currentTheme = event.detail;
                setTerminalTheme(currentTheme, terminal);
            };

            themeChangeRef.current = handleThemeChange;
            window.addEventListener("themechange", handleThemeChange);

            // Get initial theme
            const currentTheme =
                document.documentElement.getAttribute("data-theme");
            setTerminalTheme(currentTheme, terminal);

            // Resize window in resize
            const handleResize = () => {
                fitAddon.fit();
                // Resize shell on the back end
                const dimensions = {cols: terminal.cols, rows: terminal.rows};
                socket.emit("terminalResize", {
                    id: tabId,
                    dimensions: dimensions,
                });
            };
            window.addEventListener("resize", handleResize);

            // Add a resize observer to the terminal container
            const resizeObserver = new ResizeObserver(() => {
                handleResize();
            });

            const terminalContainer = termRef.current;
            if (terminalContainer) {
                resizeObserver.observe(terminalContainer);
            }
            // const ec2Ip = "ec2-13-57-246-174.us-west-1.compute.amazonaws.com";
            // const port = "6060";
            // const socket = new WebSocket(`ws://${ec2Ip}:${port}`);

            // // Attach the WebSocket to Xterm.js
            // terminal.onData((data) => {
            //     fitAddon.fit();
            //     socket.send(data);
            // });

            // // Handle WebSocket messages
            // socket.onmessage = (event) => {
            //     terminal.write(event.data);
            // };

            // // Create a Socket.IO connection with the username and project as query params
            // const socket = io("http://localhost:5000", {
            //     query: {
            //         username: "johnny",
            //         project: "appleseed",
            //     },
            // });

            // Create back end shell on mount
            socket.emit("connectTerminal", {id: tabId});

            // Send keystrokes to the server, handling Enter as exec
            terminal.onData((data) => {
                // Send keystrokes otherwise
                socket.emit(
                    "terminalInput",
                    {
                        id: tabId,
                        data,
                    },
                    (val: {success: boolean; data: string}) => {
                        if (!val.success) {
                            setShellError(val.data);
                        } else {
                            setShellError(null);
                        }
                    }
                );
            });

            // Send empty char to start to show terminal
            socket.on("connect", () => {
                socket.emit(
                    "terminalInput",
                    {
                        id: tabId,
                        data: "",
                    },
                    (val: {success: boolean; data: string}) => {
                        if (!val.success) {
                            setShellError(val.data);
                        } else {
                            setShellError(null);
                        }
                    }
                );
            });
            // // Send empty char to show revived terminal
            // socket.on("revived", () => {
            //     socket.emit("terminalInput", {
            //         id: tabId,
            //         data: "",
            //     });
            // });

            // Display incoming server data on the terminal
            socket.on("terminalOutput", (val) => {
                if (val.id === tabId) terminal.write(val.data);
            });

            // Clean up the terminal and close the WebSocket on component unmount
            return () => {
                window.removeEventListener("resize", handleResize);
                window.removeEventListener(
                    "themechange",
                    themeChangeRef.current
                );
                // socket.close();
                // socket.disconnect();
                socket.emit("disconnectTerminal", {id: tabId});
            };
        };
        if (!socket) return;
        initTerminal();
    }, [tabId, socket]);

    return !shellError ? (
        <div
            className="p-3 flex flex-col w-full h-full"
            id="custom-terminal-container"
        >
            <div className="min-h-full" ref={termRef}></div>
        </div>
    ) : (
        <div
            className="p-3 flex flex-col w-full h-full"
            id="custom-terminal-container"
        >
            <div className="min-h-full">{shellError}</div>
        </div>
    );
}
