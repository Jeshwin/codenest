"use client";

import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import TreeView from "@/components/codespace/directorytree/treeview";
import CloudShell from "@/components/codespace/cloudshell/cloudshell";
import CodeEditor from "@/components/codespace/codemirror/mirror";
import {useSearchParams} from "next/navigation";
import {ProjectProvider} from "@/components/codespace/projectContext";
import Navbar from "@/components/codespace/navbar/navbar";
import ResizableExplorer from "@/components/codespace/directorytree/resizableExplorer";

export default function CodespacePage() {
    const searchParams = useSearchParams();
    const projectName = searchParams.get("project") || "TheRoost"; // Get `project` or default to "TheRoost"
    const [socket, setSocket] = useState<Socket>();
    const [showExplorer, setShowExplorer] = useState<boolean>(true);

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

    if (!socket || !projectName) {
        // Optional: Add a loading state
        return <div>Loading...</div>;
    }

    return (
        <ProjectProvider projectName={projectName} socket={socket}>
            <Navbar
                showExplorer={showExplorer}
                setShowExplorer={setShowExplorer}
            />
            <div className="h-[calc(100vh-56px-8px)] w-screen flex">
                <ResizableExplorer showExplorer={showExplorer} />
                <div className="h-[calc(100vh-56px-8px)] flex-1 m-1 flex">
                    <div className="m-1 w-2/5 text-base flex-1 flex flex-col rounded-lg overflow-scroll bg-accent">
                        <CodeEditor filePath={"main.py"} />
                    </div>
                    <div className="m-1 w-2/5 h-auto flex-1 flex rounded-lg bg-accent">
                        <CloudShell />
                    </div>
                </div>
            </div>
        </ProjectProvider>
    );
}
