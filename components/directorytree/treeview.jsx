import { useState } from "react"

import DirectoryElement from "./directoryelement"
import FileElement from "./fileelement"
import FileSearchBar from "./filesearchbar"
import FileToolBar from "./filetoolbar"

export default function TreeView({ directoryData }) {
    // Edge case if directoryData is null
    if (directoryData == null) return

    const [collapsed, setCollapsed] = useState({})
    const [directoryDataState, setDirectoryDataState] = useState(directoryData)

    const toggleCollapse = (name) => {
        setCollapsed((prevCollapsed) => {
            const updatedCollapsed = { ...prevCollapsed }
            updatedCollapsed[name] = !updatedCollapsed[name]
            return updatedCollapsed
        })
    }

    const selectFile = (filename) => {
        console.log("Selected file " + filename)
        // Add select file to local storage
        localStorage.setItem("filename", filename)
        // Message other documents that filename is updated
        window.parent.postMessage({ type: "filenameChanged", filename }, "*")
    }

    const renderTree = (data, parentPath = "", directoryFlag = false) => {
        if (data == null) return
        return (
            <ul
                className={`${
                    directoryFlag
                        ? "border-l ml-1 pl-3 my-1 border-[var(--light-fg-2)] dark:border-[var(--dark-fg-1)] border-opacity-75"
                        : ""
                }`}
            >
                {data.map((item, index) => {
                    const subPath = parentPath + "/" + item.name
                    return (
                        <li key={index}>
                            {item.type === "directory" ? (
                                <div className="bg-[--my-bg]">
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
                                    name={item.name}
                                    onClick={() => selectFile("." + subPath)}
                                />
                            )}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className="px-3 py-2 flex flex-col font-sans">
            {/* Search Bar */}
            <FileSearchBar directoryData={directoryDataState} />
            {/* Add Files or Folders */}
            <FileToolBar
                directoryData={directoryDataState}
                setDirectoryDate={setDirectoryDataState}
            />
            {/* Tree View */}
            <div className="px-3">{renderTree(directoryDataState)}</div>
        </div>
    )
}
