import {createContext, useState} from "react";
import {ProjectStructure} from "./utils";

const ProjectStructureContext = createContext({});

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
    const [fileOrFolder, setFileOrFolder] = useState("file");

    // Function to toggle the "open" attribute of a folder
    const toggleFolder = (folderName) => {
        // Split folderName into individual folder names
        const folders = folderName.split("/");

        // Recursive function to find and toggle the folder
        const findAndToggleFolder = (folders, currentStructure) => {
            const folderName = folders[0];

            // Find the folder in the current structure
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folderName && item.type === "directory"
            );

            // Do nothing if folder doesn't exist
            if (folderIndex === -1) {
                return;
            }

            // Toggle the "open" attribute if we reached the last folder
            if (folders.length === 1) {
                currentStructure[folderIndex].open =
                    !currentStructure[folderIndex].open;
            }

            // If there are subfolders and the folder is open, continue searching
            if (currentStructure[folderIndex].open && folders.length > 1) {
                findAndToggleFolder(
                    folders.slice(1),
                    currentStructure[folderIndex].items
                );
            }

            // Update the state with the modified structure
            setProjectStructure([...projectStructure]);
        };

        findAndToggleFolder(folders, projectStructure);
    };

    const setFolderOpen = (folderName) => {
        // Split folderName into individual folder names
        const folders = folderName.split("/");

        // Recursive function to find and toggle the folder
        const findAndToggleFolder = (folders, currentStructure) => {
            const folderName = folders[0];

            // Find the folder in the current structure
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folderName && item.type === "directory"
            );

            // Do nothing if folder doesn't exist
            if (folderIndex === -1) {
                return;
            }

            // Set the "open" attribute of all the folders we've encountered
            currentStructure[folderIndex].open = true;

            // If there are subfolders and the folder is open, continue searching
            if (folders.length > 1) {
                findAndToggleFolder(
                    folders.slice(1),
                    currentStructure[folderIndex].items
                );
            }

            // Update the state with the modified structure
            setProjectStructure([...projectStructure]);
        };

        findAndToggleFolder(folders, projectStructure);
    };

    const addItem = (path, newItem) => {
        const folders = path.split("/");
        let currentStructure = projectStructure;

        // Edge case: path is empty => root directory
        if (!path) {
            // Check if the file already exists in the current structure
            const itemExists = currentStructure.some(
                (item) =>
                    item.type === newItem.type && item.name === newItem.name
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
        }

        // Traverse the file structure to the specified path
        for (const folder of folders) {
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
        const itemExists = currentStructure.some(
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

    // Function to delete a file at the specified path
    const deleteFile = (path) => {
        const folders = path.split("/");
        const fileName = folders.pop(); // Get the file name
        let currentStructure = projectStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const foundFolder = currentStructure.find(
                (item) => item.name === folder && item.type === "directory"
            );
            if (!foundFolder || foundFolder.type !== "directory") {
                // Path does not exist, file cannot be deleted
                return;
            }
            currentStructure = foundFolder.items;
        }

        // Find the index of the file to be deleted
        const fileIndex = currentStructure.findIndex(
            (item) => item.name === fileName && item.type === "file"
        );

        if (fileIndex === -1) {
            // File not found at the specified path
            return;
        }

        // Remove the file from the current structure
        currentStructure.splice(fileIndex, 1);

        // Update the state with the modified structure
        setProjectStructure([...projectStructure]);
    };

    // Function to delete a folder at the specified path
    const deleteFolder = (path) => {
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

        // Find the index of the folder to be deleted
        const folderIndex = currentStructure.findIndex(
            (item) => item.name === folderName && item.type === "directory"
        );

        if (folderIndex === -1) {
            // Folder not found at the specified path
            return;
        }

        // Remove the folder from the current structure
        currentStructure.splice(folderIndex, 1);

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
                deleteFile,
                deleteFolder,
                currentFile,
                setCurrentFile,
                showNewElementInput,
                setShowNewElementInput,
                fileOrFolder,
                setFileOrFolder,
            }}
        >
            {children}
        </ProjectStructureContext.Provider>
    );
};

export default ProjectStructureContext;
