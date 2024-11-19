"use client";

import {useState, useCallback, useEffect} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";

export default function CodeEditor() {
    const [value, setValue] = useState("console.log('hello world!');");
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"));
        }
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
            theme={theme}
        />
    );
}
