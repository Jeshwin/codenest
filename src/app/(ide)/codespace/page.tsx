"use client";

import {useEffect, useState} from "react";
import TreeView from "@/components/codespace/directorytree/treeview";
import CloudShell from "@/components/codespace/cloudshell/cloudshell";
import CodeEditor from "@/components/codespace/codemirror/mirror";

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
        <div className="h-[calc(100vh-56px-8px)] mx-1 mb-1 flex">
            <div className="m-1 min-w-fit max-w-lg flex-none rounded-lg bg-accent">
                <TreeView directoryData={directoryData} />
            </div>
            <div className="m-1 w-2/5 text-base flex-1 flex flex-col rounded-lg overflow-scroll bg-accent">
                <CodeEditor />
            </div>
            <div className="m-1 w-2/5 h-auto flex-1 flex rounded-lg bg-accent">
                <CloudShell />
            </div>
        </div>
    );
}
