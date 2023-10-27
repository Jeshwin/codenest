import ClosedDirectory from "./icons/directory/closeddirectory"
import OpenDirectory from "./icons/directory/opendirectory"

export default function DirectoryElement({ name, isCollapsed, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex flex-row gap-1 items-center
            select-none cursor-pointer
            text-black dark:text-white
            hover:opacity-50"
        >
            {isCollapsed ? <ClosedDirectory /> : <OpenDirectory />}
            <span>{name}</span>
        </div>
    )
}
