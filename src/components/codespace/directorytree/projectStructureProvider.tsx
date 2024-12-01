import {createContext, useReducer, useState} from "react";
import {ElementCreationState, ProjectStructureContextType} from "./types";
import {projectStructureReducer} from "./projectStructureReducer";

export const ProjectStructureContext =
    createContext<ProjectStructureContextType>({
        projectStructure: [],
        projectStructureDispatch: () => {},
        elementCreationState: {
            currentFile: "",
            showInput: false,
            itemType: "file",
        },
        setElementCreationState: () => {},
        isGlobalDragging: false,
        setIsGlobalDragging: () => {},
    });

// Create projectStructure provider
export const ProjectStructureProvider = ({
    initialProjectStructure,
    children,
}) => {
    // Reducer hook for project structure state
    const [projectStructure, projectStructureDispatch] = useReducer(
        projectStructureReducer,
        initialProjectStructure
    );
    // State for new element creation
    const [elementCreationState, setElementCreationState] =
        useState<ElementCreationState>({
            currentFile: "",
            showInput: false,
            itemType: "file",
        });
    // Is the user dragging a file or folder?
    const [isGlobalDragging, setIsGlobalDragging] = useState<boolean>(false);

    return (
        <ProjectStructureContext.Provider
            value={{
                projectStructure,
                projectStructureDispatch,
                elementCreationState,
                setElementCreationState,
                isGlobalDragging,
                setIsGlobalDragging,
            }}
        >
            {children}
        </ProjectStructureContext.Provider>
    );
};

export default ProjectStructureContext;
