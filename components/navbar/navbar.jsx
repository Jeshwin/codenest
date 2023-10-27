"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import ThemePicker from "./themepicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faGear,
    faMagnifyingGlass,
    faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Navbar() {
    const [logoSrc, setLogoSrc] = useState("logo.svg")

    useEffect(() => {
        var darkModePreference = window.matchMedia(
            "(prefers-color-scheme: dark)"
        )
        // Check to see if Media-Queries are supported
        if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                // Dark
                setLogoSrc("logo_dark.svg")
            } else {
                // Light
                setLogoSrc("logo_light.svg")
            }
        }
        // Continuously listen to changes in color scheme
        darkModePreference.addEventListener("change", (e) => {
            if (e.matches) {
                // Dark
                setLogoSrc("logo_dark.svg")
            } else {
                // Light
                setLogoSrc("logo_light.svg")
            }
        })
    }, [])
    return (
        <header className="top-0 flex flex-row gap-1 items-center px-3 py-2 text-black dark:text-white bg-slate-100 dark:bg-slate-800">
            <Image src={logoSrc} alt="CodeNest logo" width={32} height={32} />
            <div className="flex-grow"></div>
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-white dark:hover:bg-slate-900 active:scale-90 transition duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" />
            </div>
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-white dark:hover:bg-slate-900 active:scale-90 transition duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            </div>
            <ThemePicker />
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-white dark:hover:bg-slate-900 active:scale-90 transition duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faUserAstronaut} className="h-4 w-4" />
            </div>
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-white dark:hover:bg-slate-900 active:scale-90 transition duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
            </div>
        </header>
    )
}
