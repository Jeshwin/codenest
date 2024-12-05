import {DragEventHandler} from "react";
import {File} from "lucide-react";

export default function FileElement({
    displayName,
    fullName,
    onClick,
    onDragStart,
}) {
    const handleDragStart: DragEventHandler = e => {
        e.dataTransfer.setData("text/plain", fullName);
        if (onDragStart) {
            onDragStart();
        }
    };

    return (
        <div
            onClick={onClick}
            draggable={true}
            onDragStart={handleDragStart}
            className={`flex flex-row my-1 items-center select-none hover:opacity-50 cursor-pointer`}
        >
            <File className="size-5 text-accent-foreground" />
            <span className="ml-0.5 overflow-hidden">{displayName}</span>
        </div>
    );
}
