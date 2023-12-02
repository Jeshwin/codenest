import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
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
            <ul
                className={`mt-4 absolute ml-1 rounded-lg
                bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)]
                ${!isClicked ? "hidden" : ""}`}
            >
                <li className="py-1 px-2 rounded-t-lg hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]">
                    Code Editor
                </li>
                <li className="py-1 px-2 hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]">
                    CloudShell
                </li>
                <li className="py-1 px-2 rounded-b-lg hover:bg-[var(--light-bg-3)] hover:dark:bg-[var(--dark-bg-3)]">
                    Environments
                </li>
            </ul>
        </div>
    )
}
