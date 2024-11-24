"use client";

import {useContext, useEffect, useState, useRef} from "react";

import DirectoryElement from "./directoryelement";
import FileElement from "./fileelement";
import FileSearchBar from "./filesearchbar";
import FileToolBar from "./filetoolbar";
import {moveItem, parseProjectStructure, ProjectStructure} from "./utils";
import {ProjectContext} from "../projectContext";

export default function TreeView() {
    const {socket} = useContext(ProjectContext);
    const [projectStructure, setProjectStructure] = useState<ProjectStructure>(
        []
    );
    const [currentFile, setCurrentFile] = useState<string>();
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
    useEffect(() => {
        const handleMouseMove = (event) => {
            const containerRect =
                fileStructureRef.current.getBoundingClientRect();
            const offsetY =
                event.clientY -
                containerRect.top +
                fileStructureRef.current.scrollTop;
            setCursorY(offsetY);
        };

        const fileStructureContainer = fileStructureRef.current;

        if (fileStructureContainer) {
            fileStructureContainer.addEventListener(
                "mousemove",
                handleMouseMove
            );
        }

        return () => {
            if (fileStructureContainer) {
                fileStructureContainer.removeEventListener(
                    "mousemove",
                    handleMouseMove
                );
            }
        };
    }, []);

    return (
        <div className="h-full px-3 py-2 flex flex-col font-sans">
            {/* Search Bar */}
            <FileSearchBar directoryData={projectStructure} />
            {/* Add Files or Folders */}
            <FileToolBar
                directoryData={projectStructure}
                setDirectoryData={setProjectStructure}
            />
            {/* Tree View */}
            {/* <div className="h-full px-3 rounded-lg overflow-scroll">
                {renderTree(projectStructure)}
            </div> */}
            <ul
                id="file-explorer"
                ref={fileStructureRef}
                className="relative p-1 flex flex-col"
            >
                {projectStructure.map((item) => {
                    if (item.type === "file") {
                        return (
                            <FileElement
                                key={item.name}
                                item={item}
                                parent={""}
                                level={0}
                            />
                        );
                    } else {
                        return (
                            <DirectoryElement
                                key={item.name}
                                item={item}
                                parent={""}
                                level={0}
                            />
                        );
                    }
                })}
                {/** If selected file is in root directory, render form to add new file/folder */}
                {(!currentFile || currentFile.split("/").length - 1 == 0) && (
                    <NewItem />
                )}
                {/** Render lines from open folders, also act as collapse buttons */}
                <GutterRenderer />
                {/** Render highlighter based on cursor's vertical position */}
                <Highlighter y={cursorY} />
            </ul>
        </div>
    );
}
