import DirectoryElement from "./directoryelement"
import FileElement from "./fileelement"

import React, { useState } from "react"

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

    return <div className="px-4 py-2">{renderTree(items)}</div>
}

export default TreeView
