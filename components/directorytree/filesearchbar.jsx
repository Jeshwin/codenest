import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function FileSearchBar() {
    return (
        <div className="relative">
            <input
                placeholder="Search"
                className="h-10 p-3 w-full placeholder-slate-900 dark:placeholder-slate-50 text-slate-900 dark:text-slate-50 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900 rounded-xl"
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute inset-y-3 right-3 h-4 w-4 text-slate-900 dark:text-slate-50"
            />
        </div>
    )
}
