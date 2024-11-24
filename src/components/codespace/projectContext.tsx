import {createContext, useContext} from "react";
import {Socket} from "socket.io-client";

// Define the context
export const ProjectContext = createContext<{
    projectName: string;
    socket?: Socket;
}>({
    projectName: "TheRoost",
});

export function ProjectProvider({
    projectName,
    socket,
    children,
}: {
    projectName: string;
    socket: Socket;
    children: React.ReactNode;
}) {
    return (
        <ProjectContext.Provider value={{projectName, socket}}>
            {children}
        </ProjectContext.Provider>
    );
}
