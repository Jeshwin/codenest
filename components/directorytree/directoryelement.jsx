import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faFolderClosed,
    faFolderOpen,
} from "@fortawesome/free-regular-svg-icons"

export default function DirectoryElement({ name, isCollapsed, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex flex-row items-center
            select-none cursor-pointer
            text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)] 
            hover:opacity-50"
        >
            {isCollapsed ? (
                <FontAwesomeIcon
                    icon={faFolderClosed}
                    className="h-5 w-5 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                />
            ) : (
                <FontAwesomeIcon
                    icon={faFolderOpen}
                    className="h-5 w-5 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
                />
            )}
            <span className="ml-0.5 overflow-hidden">{name}</span>
        </div>
    )
}
