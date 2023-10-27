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
            text-slate-900 dark:text-slate-50 
            hover:opacity-50"
        >
            {isCollapsed ? (
                <FontAwesomeIcon
                    icon={faFolderClosed}
                    className="h-5 w-5 text-slate-600 dark:text-slate-300"
                />
            ) : (
                <FontAwesomeIcon
                    icon={faFolderOpen}
                    className="h-5 w-5 text-slate-600 dark:text-slate-300"
                />
            )}
            <span className="ml-0.5">{name}</span>
        </div>
    )
}
