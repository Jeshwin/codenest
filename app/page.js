"use client"

import { useEffect, useState } from "react"
import TreeView from "@/components/directorytree/treeview"
import PlaceholderWindow from "@/components/placeholders/placeholderwindow"
import Editor from "@/components/editor/editor"
import CloudShell from "@/components/cloudshell/cloudshell"

export default function Page() {
    const [directoryData, setDirectoryData] = useState(null)

    useEffect(() => {
        // Fetch the JSON data from the 'directory.json' file in the 'public' directory
        fetch("http://localhost:3000/directory.json")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok.")
            })
            .then((data) => {
                setDirectoryData(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }, [])

    return (
        <div className="h-[calc(100vh-56px)] m-1 flex">
            <div className="m-1 w-1/5 flex-none rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                <TreeView directoryData={directoryData} />
            </div>
            <div className="m-1 w-2/5 flex-1 flex flex-col rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                <Editor />
            </div>
            <div className="m-1 w-2/5 h-auto flex-1 flex rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                <CloudShell />
            </div>
        </div>
    )
}
