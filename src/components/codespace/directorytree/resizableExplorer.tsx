import {MouseEventHandler, useEffect, useState} from "react";
import FileExplorer from "./fileExplorer";

export default function ResizableExplorer({showExplorer}) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [width, setWidth] = useState(256);
    const minWidth = 128;
    const maxWidth = 320;

    // Toggle isDragging when holding separator
    const handleMouseUp = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            event.preventDefault();
            if (!isDragging) return;
            setWidth(Math.max(minWidth, Math.min(maxWidth, event.clientX)));
        };

        // Add event listeners to document
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        // Clean up event listeners when component unmounts
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            hidden={!showExplorer}
            // className={`h-full max-w-lg flex-none bg-muted transition-[transform] duration-300
            //     ${showExplorer ? "translate-x-0" : "-translate-x-full"}
            // `}
            className="h-full max-w-lg flex-none bg-muted"
            style={{
                width: width,
            }}
        >
            <FileExplorer />
            <div
                className="absolute top-0 right-0 h-full w-2 grid place-content-center cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <div className="h-6 w-0.5 bg-muted-foreground rounded-full"></div>
            </div>
        </div>
    );
}
