"use client";

import {useState, useCallback, useEffect} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";
import {myDarkTheme, myLightTheme} from "./themes";
import {io, Socket} from "socket.io-client";

export default function CodeEditor() {
    const [value, setValue] = useState("console.log('hello world!');");
    const [theme, setTheme] = useState("light");
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        // Initialize socket connection
        const socketInstance = io("http://localhost:3333");
        setSocket(socketInstance);

        // Clean up socket connection on component unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        // Listen to changes in the `data-theme` attribute
        const observer = new MutationObserver(() => {
            const currentTheme =
                document.documentElement.getAttribute("data-theme");
            setTheme(currentTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    const onChange = useCallback(
        (val, viewUpdate) => {
            console.log("val:", val);
            console.log("viewUpdate:", viewUpdate);
            setValue(val);

            // Send updated content to the server
            if (socket) {
                socket.emit("message", val);
            }
        },
        [socket]
    );

    return (
        <CodeMirror
            value={value}
            onChange={onChange}
            extensions={[loadLanguage("tsx")]}
            theme={theme === "light" ? myLightTheme : myDarkTheme}
        />
    );
}
