"use client";

import {useState, useCallback} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";

export default function CodeEditor() {
    const [value, setValue] = useState("console.log('hello world!');");
    const onChange = useCallback((val, viewUpdate) => {
        console.log("val:", val);
        setValue(val);
    }, []);
    return (
        <CodeMirror
            value={value}
            onChange={onChange}
            extensions={[loadLanguage("tsx")]}
            theme={localStorage.getItem("theme")}
        />
    );
}
