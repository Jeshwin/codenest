import {
    AddItemAction,
    DeleteItemAction,
    MoveItemAction,
    ProjectDirectory,
    ProjectFile,
    ProjectStructure,
    ProjectStructureAction,
    RenameItemAction,
    ToggleFolderAction,
} from "./types";

import {findFolder} from "./utils";

// Helper function for custom sorting items
// Directories first, then files
// Otherwise, alphabetically
const customCompare = (
    a: ProjectFile | ProjectDirectory,
    b: ProjectFile | ProjectDirectory
) => {
    if (a.type === "directory" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "directory") return 1;
    return a.name.localeCompare(b.name);
};

// Helper function to clone the project structure state
const deepCopyState = (state: ProjectStructure) => {
    return state.map((item) => {
        if (item.type === "directory") {
            // Deep copy for directory
            return {
                ...item,
                items: deepCopyState(item.items), // Recursively deep copy nested items
            };
        } else {
            // Simple copy for file
            return {...item};
        }
    });
};

// Function to toggle the "open" attribute of a folder
const toggleFolder = (state: ProjectStructure, action: ToggleFolderAction) => {
    // Copy current state for mutation
    const newState = deepCopyState(state);
    // Split folderName into individual folder names
    const folders = action.itemPath.split("/");

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
    };

    findAndToggleFolder(folders, newState);
    return newState;
};

const addItem = (state: ProjectStructure, action: AddItemAction) => {
    const folders = action.itemPath.split("/");
    let currentStructure = state;

    let newItem: ProjectFile | ProjectDirectory;
    if (action.itemType === "file") {
        newItem = {
            type: "file",
            name: folders.at(-1),
        };
    } else {
        newItem = {
            type: "directory",
            name: folders.at(-1),
            items: [],
            open: false,
        };
    }

    // Traverse the file structure to the specified path
    currentStructure = findFolder(
        currentStructure,
        action.itemPath.substring(0, action.itemPath.lastIndexOf("/"))
    );
    if (!currentStructure) return state;

    // Check if the file already exists in the current structure
    const itemExists = currentStructure.find(
        (item) => item.name === newItem.name
    );
    if (itemExists) {
        console.log(
            `An element with the name "${newItem.name}" already exists.`
        );
        return state;
    }
    // Add the new file to the current structure
    currentStructure.push(newItem);

    // Re-sort the structure to maintain alphabetical order
    currentStructure.sort(customCompare);

    return state;
};

const renameItem = (state: ProjectStructure, action: RenameItemAction) => {
    const folders = action.itemPath.split("/");
    const itemName = folders.pop(); // Get the original item name
    let currentStructure = state;

    // Traverse the file structure to the specified path
    currentStructure = findFolder(
        currentStructure,
        action.itemPath.substring(0, action.itemPath.lastIndexOf("/"))
    );
    if (!currentStructure) return state;

    // Find the index of the item to rename
    const itemIndex = currentStructure.findIndex(
        (item) => item.name === itemName
    );

    // Return early if item not found
    if (itemIndex === -1) return state;

    // Check if an item with the new name already exists
    const itemExists = currentStructure.find(
        (item) => item.name === action.newName
    );

    // Return early if an item with the new name already exists
    if (itemExists) {
        console.log(
            `An element with the name "${action.newName}" already exists.`
        );
        return state;
    }

    // Rename the item
    currentStructure[itemIndex].name = action.newName;

    // Re-sort the structure to maintain alphabetical order
    currentStructure.sort(customCompare);

    return state;
};

const moveItem = (state: ProjectStructure, action: MoveItemAction) => {
    const updatedStructure = deepCopyState(state);
    const sourceName = action.itemPath.split("/").at(-1);

    // Recusrively find the folders to update
    const sourceFolder = findFolder(
        updatedStructure,
        action.itemPath.substring(0, action.itemPath.lastIndexOf("/"))
    );
    const targetFolder = findFolder(updatedStructure, action.newItemPath);

    // Return early if source and target folders not found
    if (!(sourceFolder && targetFolder)) return state;

    // Update the found folders
    const sourceIndex = sourceFolder.findIndex(
        (item) => item.name === sourceName
    );

    // Return early if source item not found
    if (sourceIndex === -1) return state;

    // Remove the item from the source folder
    const [movedItem] = sourceFolder.splice(sourceIndex, 1);

    // Check if the file already exists in the current structure
    const itemExists = targetFolder.find(
        (item) => item.name === movedItem.name
    );

    // Return early if source item already exists in target
    if (itemExists) {
        console.log(
            `An element with the name "${movedItem.name}" already exists.`
        );
        // Return unchanged state
        return state;
    }

    // Add the item to the target folder
    targetFolder.push(movedItem);

    // Re-sort the structure to maintain alphabetical order
    targetFolder.sort(customCompare);

    return updatedStructure;
};

const deleteItem = (state: ProjectStructure, action: DeleteItemAction) => {
    const folders = action.itemPath.split("/");
    const fileName = folders.pop(); // Get the file name
    let currentStructure = state;

    // Traverse the file structure to the specified path
    currentStructure = findFolder(
        currentStructure,
        action.itemPath.substring(0, action.itemPath.lastIndexOf("/"))
    );
    if (!currentStructure) return state;

    // Remove the file from the current structure
    currentStructure = currentStructure.filter(
        (item) => item.name !== fileName
    );

    return state;
};

export function projectStructureReducer(
    state: ProjectStructure,
    action: ProjectStructureAction
) {
    console.log("Received dispatch:", action);
    switch (action.type) {
        case "toggleFolder":
            return toggleFolder(state, action);
        case "addItem":
            return addItem(state, action);
        case "renameItem":
            return renameItem(state, action);
        case "moveItem":
            return moveItem(state, action);
        case "deleteItem":
            return deleteItem(state, action);
        default:
            return state;
    }
}
