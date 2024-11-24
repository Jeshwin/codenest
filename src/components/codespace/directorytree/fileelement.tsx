import {DragEventHandler} from "react";
import {File} from "lucide-react";

export default function FileElement({item, parent, level}) {
    return (
        <div
            className={`flex flex-row my-1 items-center select-none hover:opacity-50 cursor-pointer`}
        >
            <File className="size-5 text-accent-foreground" />
            <span className="ml-0.5 overflow-hidden">{item.name}</span>
        </div>
    );
}
