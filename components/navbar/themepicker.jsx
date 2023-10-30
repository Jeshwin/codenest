"use client"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

export default function ThemePicker() {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light")
        localStorage.setItem("theme", theme == "light" ? "dark" : "light")
    }

    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"))
        }
        document.querySelector("html").setAttribute("data-theme", theme)
    }, [theme])

    return (
        <>
            <div
                className={`w-12 h-6 rounded-full flex ${
                    theme == "light" ? "bg-yellow-300" : "bg-sky-400"
                } transition duration-300 cursor-pointer shadow-inner`}
                onClick={toggleTheme}
            >
                <div
                    className={`w-6 h-6 p-1 flex item-center rounded-full bg-slate-100 dark:bg-slate-800 ${
                        theme == "light" ? "translate-x-0" : " translate-x-6"
                    } transition duration-300`}
                >
                    <FontAwesomeIcon
                        icon={theme == "light" ? faMoon : faSun}
                        className="h-4 w-4"
                    />
                </div>
            </div>
        </>
    )
}
