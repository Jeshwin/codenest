import {createContext, Dispatch, SetStateAction, useState} from "react";
import {
    findFolder,
    ProjectDirectory,
    ProjectFile,
    ProjectStructure,
} from "./utils";

interface ProjectStructureContextType {
    projectStructure: ProjectStructure;
    toggleFolder: (arg0) => void;
    setFolderOpen: (arg0) => void;
    addItem: (arg0, arg1) => boolean;
    moveItem: (arg0, arg1) => boolean;
    deleteFile: (arg0) => void;
    deleteFolder: (arg0) => void;
    currentFile: string;
    setCurrentFile: Dispatch<SetStateAction<string>>;
    showNewElementInput: boolean;
    setShowNewElementInput: Dispatch<SetStateAction<boolean>>;
    fileOrFolder: "file" | "directory";
    setFileOrFolder: Dispatch<SetStateAction<"file" | "directory">>;
    isGlobalDragging: boolean;
    setIsGlobalDragging: Dispatch<SetStateAction<boolean>>;
}

export const ProjectStructureContext =
    createContext<ProjectStructureContextType>({
        projectStructure: [],
        toggleFolder: () => {},
        setFolderOpen: () => {},
        addItem: () => false,
        moveItem: () => false,
        deleteFile: () => {},
        deleteFolder: () => {},
        currentFile: "",
        setCurrentFile: () => {},
        showNewElementInput: false,
        setShowNewElementInput: () => {},
        fileOrFolder: "file",
        setFileOrFolder: () => {},
        isGlobalDragging: false,
        setIsGlobalDragging: () => {},
    });

// Create projectStructure provider
export const ProjectStructureProvider = ({
    initialProjectStructure,
    children,
}) => {
    const [projectStructure, setProjectStructure] = useState<ProjectStructure>(
        initialProjectStructure
    );
    // Currently selected file
    const [currentFile, setCurrentFile] = useState("");
    // Toggle input for new item
    const [showNewElementInput, setShowNewElementInput] = useState(false);
    // Is the new item a file or a folder?
    const [fileOrFolder, setFileOrFolder] = useState<"file" | "directory">(
        "file"
    );
    // Is the user dragging a file or folder?
    const [isGlobalDragging, setIsGlobalDragging] = useState<boolean>(false);

    // Function to toggle the "open" attribute of a folder
    const toggleFolder = (folderName: string) => {
        // Split folderName into individual folder names
        const folders = folderName.split("/");

        // Recursive function to find and toggle the folder
        const findAndToggleFolder = (
            folders: string[],
            currentStructure: ProjectStructure
        ) => {
            const folderName = folders[0];

            // Find the folder in the current structure
            const foundFolder = currentStructure.find(
                (item) => item.name === folderName && item.type === "directory"
            );

            // Do nothing if folder doesn't exist
            if (!foundFolder || foundFolder.type !== "directory") {
                return;
            }

            // Toggle the "open" attribute if we reached the last folder
            if (folders.length === 1) {
                foundFolder.open = foundFolder.open ? false : true;
            }

            // If there are subfolders and the folder is open, continue searching
            if (foundFolder.open && folders.length > 1) {
                findAndToggleFolder(folders.slice(1), foundFolder.items);
            }

            // Update the state with the modified structure
            setProjectStructure([...projectStructure]);
        };

        findAndToggleFolder(folders, projectStructure);
    };

    const setFolderOpen = (folderName: string) => {
        console.log("Opening", folderName);
        // Split folderName into individual folder names
        const folders = folderName.split("/");

        // Recursive function to find and toggle the folder
        const findAndToggleFolder = (
            folders: string[],
            currentStructure: ProjectStructure
        ) => {
            const folderName = folders[0];

            // Find the folder in the current structure
            const foundFolder = currentStructure.find(
                (item) => item.name === folderName && item.type === "directory"
            );

            // Do nothing if folder doesn't exist
            if (!foundFolder || foundFolder.type !== "directory") {
                return;
            }

            // Set the "open" attribute of all the folders we've encountered
            foundFolder.open = true;

            // If there are subfolders and the folder is open, continue searching
            if (folders.length > 1) {
                findAndToggleFolder(folders.slice(1), foundFolder.items);
            }

            // Update the state with the modified structure
            setProjectStructure([...projectStructure]);
        };

        findAndToggleFolder(folders, projectStructure);
    };

    const addItem = (path: string, newItem: ProjectFile | ProjectDirectory) => {
        const folders = path.split("/");
        let currentStructure = projectStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            if (!folder) continue;
            const foundFolder = currentStructure.find(
                (item) => item.name === folder && item.type === "directory"
            );
            if (!foundFolder || foundFolder.type !== "directory") {
                // Path does not exist, cannot add file
                return false;
            }
            currentStructure = foundFolder.items;
        }

        // Check if the file already exists in the current structure
        const itemExists = currentStructure.find(
            (item) => item.type === newItem.type && item.name === newItem.name
        );

        if (itemExists) {
            console.log(
                `${newItem.type} "${newItem.name}" already exists in the destination folder.`
            );
            // You can show a modal or perform other actions here
            return false;
        }
        // Add the new file to the current structure
        currentStructure.push(newItem);
        currentStructure.sort((a, b) => {
            if (a.type === "directory" && b.type === "file") return -1;
            if (a.type === "file" && b.type === "directory") return 1;
            return a.name.localeCompare(b.name);
        });

        // Update the state with the modified structure
        setProjectStructure([...projectStructure]);
        return true;
    };

    const moveItem = (sourcePath: string, targetPath: string) => {
        const updatedData = [...projectStructure];

        const sourceName = sourcePath.split("/").pop();

        // Recusrively find the folders to update
        const sourceFolder = findFolder(
            updatedData,
            sourcePath.substring(0, sourcePath.lastIndexOf("/"))
        );
        const targetFolder = findFolder(updatedData, targetPath);

        // Update the found folders
        if (sourceFolder && targetFolder) {
            const sourceIndex = sourceFolder.findIndex(
                (item) => item.name === sourceName
            );

            if (sourceIndex !== -1) {
                // Remove the item from the source folder
                const [movedItem] = sourceFolder.splice(sourceIndex, 1);

                // Check if the file already exists in the current structure
                const itemExists = targetFolder.find(
                    (item) => item.name === movedItem.name
                );

                if (itemExists) {
                    console.log(
                        `${movedItem.type} "${movedItem.name}" already exists in the destination folder.`
                    );
                    // Add removed item back into original location
                    sourceFolder.push(movedItem);
                    sourceFolder.sort((a, b) => {
                        if (a.type === "directory" && b.type === "file")
                            return -1;
                        if (a.type === "file" && b.type === "directory")
                            return 1;
                        return a.name.localeCompare(b.name);
                    });

                    // You can show a modal or perform other actions here
                    return false;
                }

                // Add the item to the target folder
                targetFolder.push(movedItem);
                targetFolder.sort((a, b) => {
                    if (a.type === "directory" && b.type === "file") return -1;
                    if (a.type === "file" && b.type === "directory") return 1;
                    return a.name.localeCompare(b.name);
                });
            }
        }

        setProjectStructure(updatedData);
    };

    // Function to delete a file at the specified path
    const deleteFile = (path: string) => {
        const folders = path.split("/");
        const fileName = folders.pop(); // Get the file name
        let currentStructure = projectStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            if (!folder) continue;
            const foundFolder = currentStructure.find(
                (item) => item.name === folder && item.type === "directory"
            );
            if (!foundFolder || foundFolder.type !== "directory") {
                // Path does not exist, file cannot be deleted
                return;
            }
            currentStructure = foundFolder.items;
        }

        // Remove the file from the current structure
        currentStructure = currentStructure.filter(
            (item) => item.name !== fileName && item.type !== "file"
        );

        // Update the state with the modified structure
        setProjectStructure([...projectStructure]);
    };

    // Function to delete a folder at the specified path
    const deleteFolder = (path: string) => {
        const folders = path.split("/");
        const folderName = folders.pop(); // Get the folder name
        let currentStructure = projectStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const foundFolder = currentStructure.find(
                (item) => item.name === folder && item.type === "directory"
            );
            if (!foundFolder || foundFolder.type !== "directory") {
                // Path does not exist, folder cannot be deleted
                return;
            }
            currentStructure = foundFolder.items;
        }

        // Remove the folder from the current structure
        currentStructure = currentStructure.filter(
            (item) => item.name !== folderName && item.type !== "directory"
        );

        // Update the state with the modified structure
        setProjectStructure([...projectStructure]);
    };

    return (
        <ProjectStructureContext.Provider
            value={{
                projectStructure,
                toggleFolder,
                setFolderOpen,
                addItem,
                moveItem,
                deleteFile,
                deleteFolder,
                currentFile,
                setCurrentFile,
                showNewElementInput,
                setShowNewElementInput,
                fileOrFolder,
                setFileOrFolder,
                isGlobalDragging,
                setIsGlobalDragging,
            }}
        >
            {children}
        </ProjectStructureContext.Provider>
    );
};

export default ProjectStructureContext;
