"use client";

import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";

export default function ThemePicker() {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
        localStorage.setItem("theme", theme == "light" ? "dark" : "light");
    };

    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"));
        }
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <>
            <div
                className="w-12 h-6 rounded-full flex bg-[var(--toggle)] transition duration-300 cursor-pointer shadow-inner"
                onClick={toggleTheme}
            >
                <div
                    className={`w-6 h-6 p-1 flex item-center rounded-full bg-accent ${
                        theme == "light" ? "translate-x-0" : " translate-x-6"
                    } transition duration-300 select-none`}
                >
                    {theme === "light" ? (
                        <Sun className="size-4" />
                    ) : (
                        <Moon className="size-4" />
                    )}
                </div>
            </div>
        </>
    );
}
