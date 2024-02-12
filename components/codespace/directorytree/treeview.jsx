/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from "react";

import DirectoryElement from "./directoryelement";
import FileElement from "./fileelement";
import FileSearchBar from "./filesearchbar";
import FileToolBar from "./filetoolbar";
import {moveItem} from "./utils";

export default function TreeView({directoryData}) {
    // Edge case: directoryData is null
    if (directoryData == null) return;

    const [collapsed, setCollapsed] = useState({});
    const [directoryDataState, setDirectoryDataState] = useState(directoryData);
    const [dragOverFolder, setDragOverFolder] = useState(null);

    const toggleCollapse = (name) => {
        setCollapsed((prevCollapsed) => {
            const updatedCollapsed = {...prevCollapsed};
            updatedCollapsed[name] = !updatedCollapsed[name];
            return updatedCollapsed;
        });
    };

    const selectFile = (filename) => {
        console.log("Selected file " + filename);
        // Add select file to local storage
        localStorage.setItem("filename", filename);
        // Message other documents that filename is updated
        window.parent.postMessage({type: "filenameChanged", filename}, "*");
    };

    const handleDrop = (e, targetPath) => {
        e.preventDefault();
        setDragOverFolder(null);
        const draggedFileName = e.dataTransfer.getData("text/plain");
        console.log(`Moving file ${draggedFileName} to ${targetPath}`);

        // Avoid dropping onto itself
        if (draggedFileName === targetPath) {
            return;
        }

        const updatedDirectoryData = moveItem(
            directoryDataState,
            draggedFileName,
            targetPath
        );
        setDirectoryDataState(updatedDirectoryData);

        // Prevent drop from propagating to parent folders
        e.stopPropagation();
    };

    const handleDragStart = (filename) => {
        console.log("Dragging started for file: " + filename);
    };

    const handleDragOver = (e, folderPath) => {
        e.preventDefault();
        setDragOverFolder(folderPath);
        e.stopPropagation();
    };

    const handleDragLeave = () => {
        setDragOverFolder(null);
    };

    const renderTree = (data, parentPath = ".", directoryFlag = false) => {
        if (data == null) return;
        return (
            <ul
                className={`${
                    directoryFlag
                        ? `border-l ml-1 pl-3 my-1 border-[var(--fg-2)] border-opacity-75 `
                        : ""
                }`}
            >
                {data.map((item, index) => {
                    const subPath = parentPath + "/" + item.name;
                    return (
                        <li key={index}>
                            {item.type === "directory" ? (
                                <div
                                    className={`rounded-lg ${
                                        dragOverFolder === subPath
                                            ? "bg-[var(--bg-3)]"
                                            : ""
                                    }`}
                                    onDragOver={(e) =>
                                        handleDragOver(e, subPath)
                                    }
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, subPath)}
                                >
                                    <DirectoryElement
                                        name={item.name}
                                        isCollapsed={collapsed[subPath]}
                                        onClick={() => toggleCollapse(subPath)}
                                    />
                                    {!collapsed[subPath] &&
                                        renderTree(item.items, subPath, true)}
                                </div>
                            ) : (
                                <FileElement
                                    displayName={item.name}
                                    fullName={subPath}
                                    onClick={() => selectFile(subPath)}
                                    onDragStart={() => handleDragStart(subPath)}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="h-full px-3 py-2 flex flex-col font-sans">
            {/* Search Bar */}
            <FileSearchBar directoryData={directoryDataState} />
            {/* Add Files or Folders */}
            <FileToolBar
                directoryData={directoryDataState}
                setDirectoryDate={setDirectoryDataState}
            />
            {/* Tree View */}
            <div
                className={`h-full px-3 rounded-lg
                ${dragOverFolder === "." ? "bg-[var(--bg-2)]" : ""}`}
                onDragOver={(e) => handleDragOver(e, ".")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, ".")}
            >
                {renderTree(directoryDataState)}
            </div>
        </div>
    );
}
