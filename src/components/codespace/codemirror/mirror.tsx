"use client";

import {useState, useCallback, useEffect} from "react";

import CodeMirror, {ViewUpdate} from "@uiw/react-codemirror";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";
import {ChangeSet, Text} from "@codemirror/state";
import {Update, rebaseUpdates} from "@codemirror/collab";

import {myDarkTheme, myLightTheme} from "./themes";
import {useProjectContext} from "@/app/(ide)/codespace/page";

export default function CodeEditor({filePath}) {
    const {socket} = useProjectContext();
    const [value, setValue] = useState("console.log('hello world!');");
    const [theme, setTheme] = useState("light");
    const [fileError, setFileError] = useState<string>();

    useEffect(() => {
        // Set initial theme to data-theme of document
        setTheme(
            document.documentElement.getAttribute("data-theme") ?? "light"
        );

        // Listen for the custom 'themechange' event
        const handleThemeChange = (event: CustomEvent) => {
            const currentTheme = event.detail;
            setTheme(currentTheme);
        };

        window.addEventListener("themechange", handleThemeChange);

        return () => {
            window.removeEventListener("themechange", handleThemeChange);
        };
    }, []);

    useEffect(() => {
        // Get file contents of current file
        socket.emit("getFileContents", filePath);

        // Configure socket listeners
        socket.on("fileContents", (data) => {
            setValue(data);
        });

        // Configure socket listeners
        socket.on("fileError", (errorMessage) => {
            setFileError(errorMessage);
        });

        // Clean up socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [filePath, socket]);

    const onChange = useCallback(
        (val: string, _viewUpdate: ViewUpdate) => {
            setValue(val);
            // Update the file on the back end
            if (!socket) return;
            socket.emit("updateFile", filePath, val);
        },
        [socket, filePath]
    );

    return !fileError ? (
        <CodeMirror
            value={value}
            onChange={onChange}
            extensions={[loadLanguage("tsx")]}
            theme={theme === "light" ? myLightTheme : myDarkTheme}
        />
    ) : (
        <div className="bg-destructive text-destructive-foreground grid place-content-center text-center">
            {fileError}
        </div>
    );
}
