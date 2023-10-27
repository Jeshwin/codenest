import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

export default function ThemePicker() {
    const [isLight, setIsLight] = useState(true)

    useEffect(() => {
        setIsLight(false)
    }, [])

    const changeIcon = () => {
        console.log("Changed isLight from " + isLight + " to " + !isLight)
        setIsLight(!isLight)
    }

    return (
        <div
            className="w-8 h-8 p-2 flex item-center rounded-xl hover:bg-white dark:hover:bg-slate-900 active:scale-90 transition duration-150 cursor-pointer"
            onClick={changeIcon}
        >
            {isLight ? (
                <FontAwesomeIcon icon={faSun} className="h-4 w-4" />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="h-4 w-4" />
            )}
        </div>
    )
}
