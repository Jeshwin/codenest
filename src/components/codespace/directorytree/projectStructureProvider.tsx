import {createContext, useContext, useReducer, useState} from "react";
import {
    ElementCreationState,
    ProjectStructure,
    ProjectStructureAction,
    ProjectStructureContextType,
} from "./types";
import {projectStructureReducer} from "./projectStructureReducer";
import {ProjectContext} from "../projectContext";

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
    const {socket} = useContext(ProjectContext);
    // Reducer hook for project structure state
    const [projectStructure, projectStructureDispatch] = useReducer(
        (state: ProjectStructure, action: ProjectStructureAction) =>
            projectStructureReducer(state, action, socket),
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
