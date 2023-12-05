"use client"

import {
    faChevronDown,
    faCloud,
    faCode,
    faSeedling,
    faShekel,
    faTerminal,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function FeatureDropdown() {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <div>
            <button
                className="hover:bg-[var(--light-bg-2)] hover:dark:bg-[var(--dark-bg-2)]
            rounded-lg flex items-center px-2 py-1 mx-1 active:scale-90 duration-200"
                onClick={() => setIsClicked(!isClicked)}
            >
                Features
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className="w-2 h-2 pl-1"
                />
            </button>
            {isClicked && (
                <ul
                    className="mt-4 absolute ml-1 rounded-lg shadow-lg
                bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]"
                >
                    <li className="py-3 px-4 rounded-t-lg transition duration-200 hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]">
                        <FontAwesomeIcon
                            icon={faCode}
                            className="w-4 h-4 pr-2"
                        />
                        Code Editor
                    </li>
                    <li className="py-3 px-4 transition duration-200 hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]">
                        <FontAwesomeIcon
                            icon={faTerminal}
                            className="w-4 h-4 pr-2"
                        />
                        CloudShell
                    </li>
                    <li className="py-3 px-4 transition duration-200 rounded-b-lg hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]">
                        <FontAwesomeIcon
                            icon={faSeedling}
                            className="w-4 h-4 pr-2"
                        />
                        Environments
                    </li>
                </ul>
            )}
        </div>
    )
}
