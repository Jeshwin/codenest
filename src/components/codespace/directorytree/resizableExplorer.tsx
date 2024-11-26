import {MouseEventHandler, useEffect, useState} from "react";
import FileExplorer from "./fileExplorer";

export default function ResizableExplorer({showExplorer}) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [width, setWidth] = useState(256);
    const minWidth = 128;
    const maxWidth = 320;

    // Toggle isDragging when holding separator
    const handleMouseUp: MouseEventHandler<HTMLElement> = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleMouseDown: MouseEventHandler<HTMLElement> = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
            event.preventDefault();
            if (!isDragging) return;
            setWidth(Math.max(minWidth, Math.min(maxWidth, event.clientX)));
        };

        // Add event listeners to document
        document.addEventListener(
            "mousemove",
            handleMouseMove as unknown as (
                this: Document,
                ev: MouseEvent
            ) => never
        );
        document.addEventListener(
            "mouseup",
            handleMouseUp as unknown as (
                this: Document,
                ev: MouseEvent
            ) => never
        );

        // Clean up event listeners when component unmounts
        return () => {
            document.removeEventListener(
                "mousemove",
                handleMouseMove as unknown as (
                    this: Document,
                    ev: MouseEvent
                ) => never
            );
            document.removeEventListener(
                "mouseup",
                handleMouseUp as unknown as (
                    this: Document,
                    ev: MouseEvent
                ) => never
            );
        };
    }, [isDragging]);

    return (
        <>
            <div
                hidden={!showExplorer}
                className="relative h-full max-w-lg flex-none bg-muted transition-transform duration-300"
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
        </>
    );
}
