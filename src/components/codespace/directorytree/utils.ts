// Types

export interface ProjectDirectory {
    type: "directory";
    name: string;
    open?: boolean;
    items: ProjectStructure; // Recursive reference for nested directories
}

export interface ProjectFile {
    type: "file";
    name: string;
}

export type ProjectStructure = Array<ProjectDirectory | ProjectFile>;

// Functions

export function fuzzySearchFilename(
    searchTerm: string,
    structure: ProjectStructure,
    prefix = ""
) {
    const regexPattern = searchTerm.split("").join(".*");
    const regex = new RegExp(regexPattern, "i");

    var searchResults = [];
    for (let element of structure) {
        const fullPath = prefix + element.name;

        if (element.type === "file") {
            const match = fullPath.match(regex);
            if (match) {
                // Calculate boldLetters array
                let searchTermPointer = 0;
                let boldLetters = [];
                for (
                    let i = 0;
                    i < fullPath.length &&
                    searchTermPointer < searchTerm.length;
                    i++
                ) {
                    if (
                        searchTerm[searchTermPointer].toLowerCase() ===
                        fullPath[i].toLowerCase()
                    ) {
                        boldLetters.push(i);
                        searchTermPointer++;
                    }
                }
                searchResults.push({
                    fullPath,
                    name: element.name,
                    boldLetters,
                });
            }
        } else {
            searchResults = searchResults.concat(
                fuzzySearchFilename(searchTerm, element.items, fullPath + "/")
            );
        }
    }
    return searchResults;
}

export function findFolder(
    data: ProjectStructure,
    fullPath: string
): ProjectStructure {
    // Edge case: folder is root folder
    if (fullPath === ".") return data;

    const pathComponents = fullPath.split("/").filter(Boolean);

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

    return returnProjectStructure;
}
