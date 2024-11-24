// Types

export interface ProjectDirectory {
    type: "directory";
    name: string;
    items: ProjectStructure; // Recursive reference for nested directories
}

export interface ProjectFile {
    type: "file";
    name: string;
}

export type ProjectStructure = Array<ProjectDirectory | ProjectFile>;

export function searchFilename(
    searchTerm: string,
    directoryData: ProjectStructure,
    prefix = ""
) {
    var searchResults = [];
    // Iterate through elements in directory
    for (const element of directoryData) {
        // Check if file
        if (element.type === "file") {
            // Check file name
            if (element.name.includes(searchTerm))
                searchResults.push([prefix + element.name, element.name]);
        } else if (element.type === "directory") {
            // Element is a directory
            // Look through its files and folders
            // Add to result
            searchResults = searchResults.concat(
                searchFilename(
                    searchTerm,
                    element.items,
                    prefix + element.name + "/"
                )
            );
        }
    }
    // Return results
    return searchResults;
}

export function moveItem(
    data: ProjectStructure,
    sourceItem: string,
    targetPath: string
) {
    console.log("Before ↓");
    console.debug(data);

    const updatedData = [...data];

    const sourceName = sourceItem.split("/").pop();

    // Recusrively find the folders to update
    const sourceFolder = findFolder(
        updatedData,
        sourceItem.substring(0, sourceItem.lastIndexOf("/"))
    );
    const targetFolder = findFolder(updatedData, targetPath);

    console.log("Source ↓");
    console.debug(sourceFolder);
    console.log("Target ↓");
    console.debug(targetFolder);

    // Update the found folders
    if (sourceFolder && targetFolder) {
        const sourceIndex = sourceFolder.findIndex(
            (item) => item.type === "file" && item.name === sourceName
        );

        if (sourceIndex !== -1) {
            // Remove the item from the source folder
            const [movedItem] = sourceFolder.splice(sourceIndex, 1);

            // Add the item to the target folder
            targetFolder.push(movedItem);
        }
    }

    console.log("After ↓");
    console.debug(updatedData);
    return updatedData;
}

function findFolder(
    data: ProjectStructure,
    fullPath: string
): ProjectStructure {
    // Edge case: folder is root folder
    if (fullPath === ".") return data;

    const pathComponents = fullPath.split("/").filter(Boolean);

    console.log("pathComponents ↓");
    console.debug(pathComponents);

    let currentData = data;

    for (const componentName of pathComponents) {
        if (componentName === ".") continue;
        const subfolder = currentData.find(
            (item) => item.type === "directory" && item.name === componentName
        );

        if (subfolder && subfolder.type === "directory") {
            currentData = subfolder.items;
        } else {
            // If any component of the path is not found, return null
            return null;
        }
    }

    // Return the last found folder
    return currentData;
}

// Function to convert project structure data from container into tree data structure
export function parseProjectStructure(data: string) {
    const returnProjectStructure: ProjectStructure = [];

    for (let content of data.split("\n")) {
        if (!content) continue;
        let path = content.split("/");
        const isDirectory = path[path.length - 1] === "";

        let contentName: string;
        if (isDirectory) {
            contentName = path[path.length - 2];
        } else {
            contentName = path[path.length - 1];
        }

        path = path.slice(1, path.length - 1);

        let currentStructure = returnProjectStructure;
        for (let i = 0; i < path.length; i++) {
            const nextStructure = currentStructure.find(
                (content) =>
                    content.type === "directory" && content.name === path[i]
            );
            if (nextStructure && nextStructure.type === "directory") {
                currentStructure = nextStructure.items;
            }
        }
        if (isDirectory) {
            currentStructure.push({
                type: "directory",
                name: contentName,
                items: [],
            });
        } else {
            currentStructure.push({
                type: "file",
                name: contentName,
            });
        }
    }

    console.dir(returnProjectStructure);
    return returnProjectStructure;
}
