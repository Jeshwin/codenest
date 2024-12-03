"use client";

import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import CloudShell from "@/components/codespace/cloudshell/cloudshell";
import CodeEditor from "@/components/codespace/codemirror/mirror";
import {useSearchParams} from "next/navigation";
import {ProjectProvider} from "@/components/codespace/projectContext";
import Navbar from "@/components/codespace/navbar/navbar";
import {Layman, LaymanLayout, LaymanProvider, TabData} from "react-layman";
import {BedDouble, Terminal, Worm} from "lucide-react";
import FileExplorer from "@/components/codespace/directorytree/fileExplorer";

export default function CodespacePage() {
    const searchParams = useSearchParams();
    const projectName = searchParams.get("project") || "TheRoost"; // Get `project` or default to "TheRoost"
    const [socket, setSocket] = useState<Socket>();
    const [showExplorer, setShowExplorer] = useState<boolean>(true);
    const [initialLayout, setInitialLayout] = useState<LaymanLayout>();

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

    useEffect(() => {
        setInitialLayout({
            direction: "row",
            children: [
                {
                    tabs: [
                        new TabData("main.py", {
                            type: "editor",
                            projectPath: "main.py",
                            icon: <Worm className="size-4" />,
                        }),
                    ],
                    selectedIndex: 0,
                },
                {
                    tabs: [
                        new TabData("Shell", {
                            icon: <Terminal className="size-4" />,
                        }),
                    ],
                    selectedIndex: 0,
                },
            ],
        });
    }, []);

    if (!socket || !projectName || !initialLayout) {
        return <div>Loading...</div>;
    }

    const renderPane = (tab: TabData) => {
        if (tab.options.type === "editor") {
            return <CodeEditor filePath={tab.options.projectPath} />;
        }
        if (tab.name === "Shell") {
            return <CloudShell tabId={tab.id} />;
        }
    };

    const renderTab = (tab: TabData) => (
        <div className="flex space-x-2">
            {tab.options.icon && (tab.options.icon as JSX.Element)}
            <div>{tab.name}</div>
        </div>
    );

    function NullLayout() {
        return (
            <div className="w-full h-full flex flex-col justify-center align-middle bg-muted">
                <BedDouble className="size-48" />
                <div className="m-4 text-4xl">Open a file to get started!</div>
            </div>
        );
    }

    return (
        <ProjectProvider projectName={projectName} socket={socket}>
            <Navbar
                showExplorer={showExplorer}
                setShowExplorer={setShowExplorer}
            />
            <LaymanProvider
                initialLayout={initialLayout}
                renderPane={renderPane}
                renderTab={renderTab}
                renderNull={<NullLayout />}
                mutable
                toolbarButtons={["splitBottom", "splitRight", "misc"]}
            >
                <div className="relative h-[calc(100vh-48px)] w-screen flex">
                    <FileExplorer showExplorer={showExplorer} />
                    <div className="h-full w-full flex-1">
                        <Layman />
                    </div>
                </div>
            </LaymanProvider>
        </ProjectProvider>
    );
}
