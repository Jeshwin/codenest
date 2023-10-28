"use client"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

export default function ThemePicker() {
    const [isLight, setIsLight] = useState(true)
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        // Check if 'theme' is set in localStorage
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme) {
            setTheme(storedTheme)
            setIsLight(storedTheme == "light")
        } else {
            setTheme("light")
            setIsLight(true)
        }
    }, [])

    // Add to localStorage whenever theme changes
    useEffect(() => {
        // Set the theme class on the HTML tag
        document.documentElement.className = `${theme}`
        // Save the theme preference to localStorage
        localStorage.setItem("theme", theme)
    }, [theme])

    const changeIcon = () => {
        setIsLight(!isLight)
        setTheme(theme == "light" ? "dark" : "light")
        localStorage.setItem("theme", theme == "light" ? "dark" : "light")
        console.debug(localStorage.getItem("theme"))
    }

    return (
        <>
            <div
                className={`w-12 h-6 rounded-full flex ${
                    isLight ? "bg-yellow-300" : "bg-sky-400"
                } transition duration-300 cursor-pointer shadow-inner`}
                onClick={changeIcon}
            >
                <div
                    className={`w-6 h-6 p-1 flex item-center rounded-full bg-slate-100 dark:bg-slate-800 ${
                        isLight ? "translate-x-0" : " translate-x-6"
                    } transition duration-300`}
                >
                    <FontAwesomeIcon
                        icon={isLight ? faMoon : faSun}
                        className="h-4 w-4"
                    />
                </div>
            </div>
        </>
    )
}
