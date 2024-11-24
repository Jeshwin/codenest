import {FolderClosed, FolderOpen} from "lucide-react";

export default function DirectoryElement({item, parent, level}) {
    return (
        <div className="flex flex-row items-center select-none cursor-pointer hover:opacity-50">
            <FolderOpen className="size-5 text-accent-foreground" />
            <span className="ml-0.5 overflow-hidden">{item.name}</span>
        </div>
    );
}
