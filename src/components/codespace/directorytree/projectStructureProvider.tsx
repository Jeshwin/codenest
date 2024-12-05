import {
    createContext,
    useCallback,
    useContext,
    useReducer,
    useState,
} from "react";
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
    const [projectStructure, dispatch] = useReducer(
        projectStructureReducer,
        initialProjectStructure
    );

    // Wrapper around project structure reducer
    // Optimistically sync with socket
    // Roll back to prevState if sync fails
    const projectStructureDispatch = useCallback(
        async (action: ProjectStructureAction) => {
            const prevState = projectStructure;
            dispatch(action);
            try {
                const response = await socket.emitWithAck(action.type, action);
                if (!response.success) {
                    dispatch({
                        type: "rollback",
                        prevState,
                        itemPath: "",
                    });
                }
            } catch (error) {
                dispatch({
                    type: "rollback",
                    prevState,
                    itemPath: "",
                });
            }
        },
        [projectStructure, socket]
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
