import React, { useState } from "react"

import DirectoryElement from "./directoryelement"
import FileElement from "./fileelement"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faEllipsis,
    faFileCirclePlus,
    faFolderPlus,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import FileSearchBar from "./filesearchbar"

const TreeView = ({ items }) => {
    const [collapsed, setCollapsed] = useState({})

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

    // Edge case if items is null
    if (items == null) return

    const renderTree = (items, parentPath = "", directoryFlag = false) => {
        return (
            <ul
                className={`${
                    directoryFlag
                        ? "border-l ml-1 pl-3 my-1 border-slate-600 dark:border-slate-30 border-opacity-75"
                        : ""
                }`}
            >
                {items.map((item, index) => {
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
            <FileSearchBar />
            {/* Add Files or Folders */}
            <div className="h-4 my-2 pl-3 flex flex-row items-center text-slate-900 dark:text-slate-50">
                <span className="font-bold">Files</span>
                <span className="flex-grow"></span>
                <div className="h-6 w-6 p-1 flex items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 cursor-pointer">
                    <FontAwesomeIcon
                        icon={faFileCirclePlus}
                        className="h-4 w-4"
                    />
                </div>
                <div className="h-6 w-6 p-1 flex items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 cursor-pointer">
                    <FontAwesomeIcon icon={faFolderPlus} className="h-4 w-4" />
                </div>
                <div className="h-6 w-6 p-1 flex items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 cursor-pointer">
                    <FontAwesomeIcon icon={faEllipsis} className="h-4 w-4" />
                </div>
            </div>
            {/* Tree View */}
            <div className="px-3">{renderTree(items)}</div>
        </div>
    )
}

export default TreeView
