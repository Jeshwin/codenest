"use client";

import {useState, useCallback, useEffect} from "react";
import CodeMirror, {Compartment} from "@uiw/react-codemirror";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";
import {myDarkTheme, myLightTheme} from "./themes";

type Theme = "light" | "dark";

export default function CodeEditor() {
    const [value, setValue] = useState("console.log('hello world!');");
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        // Listen to changes in the `data-theme` attribute
        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute(
                "data-theme"
            ) as Theme;
            setTheme(currentTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    const onChange = useCallback((val, _viewUpdate) => {
        console.log("val:", val);
        setValue(val);
    }, []);

    return (
        <CodeMirror
            value={value}
            onChange={onChange}
            extensions={[loadLanguage("tsx")]}
            theme={theme === "light" ? myLightTheme : myDarkTheme}
        />
    );
}
