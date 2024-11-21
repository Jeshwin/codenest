"use client";

import {useState, useEffect} from "react";

export default function TypewriterText({text}) {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const intervalId = setInterval(() => {
                setDisplayText(prevText => prevText + text[index]);
                setIndex(prevIndex => prevIndex + 1);
            }, 70); // Adjust the speed of typing

            return () => clearInterval(intervalId);
        }
    }, [index, text]);

    return (
        <div className="text-8xl font-mono font-light select-none">
            <span>{displayText}</span>
            <span className="animate-blink">_</span>
        </div>
    );
}
