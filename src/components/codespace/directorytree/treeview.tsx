"use client";

import {
    useContext,
    useEffect,
    useState,
    useRef,
    MouseEventHandler,
} from "react";

import FileToolBar from "./toolBar";
import {parseProjectStructure, ProjectStructure} from "./utils";
import {ProjectContext} from "../projectContext";
import NewElement from "./newElement";
import GutterRenderer from "./gutterRenderer";
import DropHighlighter from "./dropHighlighter";
import {ProjectStructureProvider} from "./projectStructureProvider";
import RenderElements from "./renderElements";

export default function TreeView() {
    const {socket} = useContext(ProjectContext);
    const [projectStructure, setProjectStructure] =
        useState<ProjectStructure>();
    const [cursorY, setCursorY] = useState(0);
    // Take into account scroll position when getting cursor vertical position
    const fileStructureRef = useRef(null);

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

    if (!projectStructure) {
        return <div>Loading...</div>;
    }

    return (
        <ProjectStructureProvider initialProjectStructure={projectStructure}>
            <div className="h-full p-2 flex flex-col font-sans overflow-scroll">
                {/* Add Files or Folders */}
                <FileToolBar />
                {/* Tree View */}
                <ul
                    id="file-explorer"
                    ref={fileStructureRef}
                    className="relative py-1 flex flex-col"
                    onMouseMove={handleMouseMove}
                    onDragOver={handleMouseMove}
                >
                    <RenderElements />
                    {/** If selected file is in root directory, render form to add new file/folder */}
                    {<NewElement folderPath="" />}
                    {/** Render lines from open folders, also act as collapse buttons */}
                    <GutterRenderer />
                    {/** Render highlighter based on cursor's vertical position */}
                    <DropHighlighter y={cursorY} />
                </ul>
            </div>
        </ProjectStructureProvider>
    );
}
