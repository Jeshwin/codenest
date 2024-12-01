"use client";

import {useState, useCallback, useEffect, useContext} from "react";

import CodeMirror, {ViewUpdate} from "@uiw/react-codemirror";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";
import {ChangeSet, Text} from "@codemirror/state";
import {Update, rebaseUpdates} from "@codemirror/collab";

import {myDarkTheme, myLightTheme} from "./themes";
import {ProjectContext} from "../projectContext";

export default function CodeEditor({filePath}) {
    const {socket} = useContext(ProjectContext);
    const [value, setValue] = useState<string>();
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
        if (!socket) return;
        // Get file contents of current file
        socket.emit("getFileContents", filePath, (val) => {
            console.log("getFileContents", filePath, "=>", val);
            if (val.success) {
                setValue(val.data);
            } else {
                setFileError(val.data);
            }
        });

        // Configure socket listeners
        socket.on("fileError", (errorMessage) => {
            setFileError(errorMessage);
        });
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
        <div className="h-full overflow-hidden">
            <CodeMirror
                value={value}
                onChange={onChange}
                extensions={[loadLanguage("tsx")]}
                theme={theme === "light" ? myLightTheme : myDarkTheme}
                style={{
                    height: "100%", // Ensure full height
                    overflow: "auto", // Allow scrolling if content overflows
                }}
            />
        </div>
    ) : (
        <div className="bg-destructive text-destructive-foreground grid place-content-center text-center">
            {fileError}
        </div>
    );
}
