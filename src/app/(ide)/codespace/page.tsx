"use client";

import {createContext, useEffect, useState, useContext} from "react";
import {io, Socket} from "socket.io-client";
import TreeView from "@/components/codespace/directorytree/treeview";
import CloudShell from "@/components/codespace/cloudshell/cloudshell";
import CodeEditor from "@/components/codespace/codemirror/mirror";
import {useSearchParams} from "next/navigation";

// Define the context
const ProjectContext = createContext<{
    projectName: string;
    socket: Socket | undefined;
} | null>(null);

// Create a custom hook for easier access to context
export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error(
            "useProjectContext must be used within a ProjectProvider"
        );
    }
    return context;
};

export default function CodespacePage() {
    const searchParams = useSearchParams();
    const projectName = searchParams.get("project") || "TheRoost"; // Get `project` or default to "TheRoost"
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        // Connect to the socket.io server
        const newSocket = io(`http://localhost:3333`, {
            query: {project: projectName},
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Cleanup socket on unmount
        };
    }, [projectName]);

    const [directoryData, setDirectoryData] = useState(null);

    useEffect(() => {
        // Fetch the JSON data from the 'directory.json' file in the 'public' directory
        fetch("/directory.json")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((data) => {
                setDirectoryData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    if (!socket || !projectName) {
        // Optional: Add a loading state
        return <div>Loading...</div>;
    }

    return (
        <ProjectContext.Provider value={{projectName, socket}}>
            <div className="h-[calc(100vh-56px-8px)] mx-1 mb-1 flex">
                <div className="m-1 min-w-fit max-w-lg flex-none rounded-lg bg-accent">
                    <TreeView directoryData={directoryData} />
                </div>
                <div className="m-1 w-2/5 text-base flex-1 flex flex-col rounded-lg overflow-scroll bg-accent">
                    <CodeEditor filePath={"main.py"} />
                </div>
                <div className="m-1 w-2/5 h-auto flex-1 flex rounded-lg bg-accent">
                    <CloudShell />
                </div>
            </div>
        </ProjectContext.Provider>
    );
}
