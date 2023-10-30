"use client"

import { useState, useEffect } from "react"

import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ProjectName() {
    const [projectName, setProjectName] = useState("")

    useEffect(() => {
        // Fetch the JSON data from the 'directory.json' file in the 'public' directory
        fetch("http://localhost:3030/projectname")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok.")
            })
            .then((data) => {
                console.debug(data)
                setProjectName(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }, [])

    return (
        <button
            className="h-8 p-2 flex items-center rounded-lg
                    bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900
                      active:scale-90 transition-transform duration-150"
        >
            {projectName}
            <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2 pl-1" />
        </button>
    )
}
