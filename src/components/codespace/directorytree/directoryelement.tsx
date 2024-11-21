import {FolderClosed, FolderOpen} from "lucide-react";

export default function DirectoryElement({name, isCollapsed, onClick}) {
    return (
        <div
            onClick={onClick}
            className="flex flex-row items-center select-none cursor-pointer hover:opacity-50"
        >
            {isCollapsed ? (
                <FolderClosed className="size-5 text-accent-foreground" />
            ) : (
                <FolderOpen className="size-5 text-accent-foreground" />
            )}
            <span className="ml-0.5 overflow-hidden">{name}</span>
        </div>
    );
}
