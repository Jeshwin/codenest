"use client";

import {useEffect, useState} from "react";
import Navbar from "@/src/components/codespace/navbar/navbar";
import TreeView from "@/src/components/codespace/directorytree/treeview";
import CloudShell from "@/src/components/codespace/cloudshell/cloudshell";
import CodeEditor from "@/src/components/codespace/codemirror/mirror";

export default function Page() {
    const [directoryData, setDirectoryData] = useState(null);

    useEffect(() => {
        // Fetch the JSON data from the 'directory.json' file in the 'public' directory
        fetch("/directory.json")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(data => {
                setDirectoryData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <body className="overflow-hidden h-screen bg-[var(--bg-3)]">
            <div className="w-screen">
                <Navbar />
                <div className="h-[calc(100vh-56px)] m-1 flex">
                    <div className="m-1 min-w-fit max-w-lg flex-none rounded-lg bg-[var(--bg-1)]">
                        <TreeView directoryData={directoryData} />
                    </div>
                    <div className="m-1 w-2/5 text-base flex-1 flex flex-col rounded-lg bg-[var(--bg-1)] overflow-scroll">
                        <CodeEditor />
                    </div>
                    <div className="m-1 w-2/5 h-auto flex-1 flex rounded-lg bg-[var(--bg-1)]">
                        <CloudShell />
                    </div>
                </div>
            </div>
        </body>
    );
}
