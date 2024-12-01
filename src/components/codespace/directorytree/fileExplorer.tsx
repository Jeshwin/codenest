"use client";

import {
    useContext,
    useEffect,
    useState,
    useRef,
    MouseEventHandler,
} from "react";

import FileToolBar from "./toolBar";
import {parseProjectStructure} from "./utils";
import {ProjectStructure} from "./types";
import {ProjectContext} from "../projectContext";
import NewElement from "./newElement";
import GutterRenderer from "./gutterRenderer";
import DropHighlighter from "./dropHighlighter";
import {ProjectStructureProvider} from "./projectStructureProvider";
import RenderElements from "./renderElements";
import LoadingSpinner from "@/components/loadingspinner";

export default function FileExplorer({showExplorer}) {
    const {socket} = useContext(ProjectContext);
    const [projectStructure, setProjectStructure] =
        useState<ProjectStructure>();
    const [cursorY, setCursorY] = useState(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [width, setWidth] = useState(256);
    // Take into account scroll position when getting cursor vertical position
    const fileStructureRef = useRef(null);

    const minWidth = 128;
    const maxWidth = 320;

    useEffect(() => {
        if (!socket) return;

        socket.emit("getProjectStructure", (val) => {
            if (val.success) {
                setProjectStructure(parseProjectStructure(val.data));
            }
        });
    }, [socket]);

    // Render highlighter based on cursor's vertical position
    const handleMouseMove: MouseEventHandler = (event) => {
        const containerRect = fileStructureRef.current.getBoundingClientRect();
        const offsetY =
            event.clientY -
            containerRect.top +
            fileStructureRef.current.scrollTop;
        setCursorY(offsetY);
    };

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

    if (!projectStructure) {
        return (
            <div
                className="h-full max-w-lg flex-none bg-muted grid place-content-center"
                style={{
                    width: width,
                }}
            >
                <LoadingSpinner width={width / 2} height={width / 2} />
            </div>
        );
    }

    return (
        <div
            hidden={!showExplorer}
            className="h-full max-w-lg flex-none bg-muted"
            style={{
                width: width,
            }}
        >
            <ProjectStructureProvider
                initialProjectStructure={projectStructure}
            >
                <div className="h-full p-2 flex flex-col font-sans">
                    {/* Add Files or Folders */}
                    <FileToolBar />
                    {/* Tree View */}
                    <ul
                        id="file-explorer"
                        ref={fileStructureRef}
                        className="relative py-1 flex flex-col overflow-y-scroll"
                        onMouseMove={handleMouseMove}
                        onDragOver={handleMouseMove}
                    >
                        <RenderElements parent="" level={0} />
                        {/** If selected file is in root directory, render form to add new file/folder */}
                        {<NewElement folderPath="" />}
                        {/** Render lines from open folders, also act as collapse buttons */}
                        <GutterRenderer />
                        {/** Render highlighter based on cursor's vertical position */}
                        <DropHighlighter y={cursorY} />
                    </ul>
                </div>
            </ProjectStructureProvider>
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
