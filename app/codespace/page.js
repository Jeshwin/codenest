"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/codespace/navbar/navbar"
import TreeView from "@/components/codespace/directorytree/treeview"
import Editor from "@/components/codespace/editor/editor"
import CloudShell from "@/components/codespace/cloudshell/cloudshell"

export default function Page() {
    const [directoryData, setDirectoryData] = useState(null)

    useEffect(() => {
        // Fetch the JSON data from the 'directory.json' file in the 'public' directory
        fetch("/directory.json")
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
        <body className="overflow-hidden h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]">
            <div className="w-screen">
                <Navbar />
                <div className="h-[calc(100vh-56px)] m-1 flex">
                    <div className="m-1 min-w-fit max-w-lg flex-none rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                        <TreeView directoryData={directoryData} />
                    </div>
                    <div className="m-1 w-2/5 flex-1 flex flex-col rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                        <Editor />
                    </div>
                    <div className="m-1 w-2/5 h-auto flex-1 flex rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
                        <CloudShell />
                    </div>
                </div>
            </div>
        </body>
    )
}
