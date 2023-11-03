import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function FileSearchBar() {
    return (
        <div className="relative">
            <input
                placeholder="Search"
                className="h-10 p-3 w-full placeholder-[var(--light-fg-1)] dark:placeholder-[var(--dark-fg-1)] text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)] bg-[var(--light-bg-2)] dark:bg-[var(--dark-bg-2)] hover:bg-[var(--light-bg-3)] dark:hover:bg-[var(--dark-bg-3)] rounded-xl"
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute inset-y-3 right-3 h-4 w-4 text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]"
            />
        </div>
    )
}
