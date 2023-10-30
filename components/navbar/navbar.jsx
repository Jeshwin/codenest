import ThemePicker from "./themepicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faGear,
    faMagnifyingGlass,
    faServer,
    faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons"
import Logo from "./logo"
import ProjectName from "./projectname"

export default function Navbar() {
    return (
        <header className="top-0 flex flex-row gap-1 items-center px-3 py-2 font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-700">
            <Logo />
            <ProjectName />
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faServer} className="h-4 w-4" />
            </div>
            <div className="flex-grow"></div>
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" />
            </div>
            <ThemePicker />
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faUserAstronaut} className="h-4 w-4" />
            </div>
            <div className="h-8 w-8 p-2 flex item-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
            </div>
        </header>
    )
}