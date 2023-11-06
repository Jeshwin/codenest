export function searchFilename(searchTerm, directoryData, prefix = "") {
    var searchResults = []
    // Iterate through elements in directory
    for (const element of directoryData) {
        // Check if file
        if (element.type === "file") {
            // Check file name
            if (element.name.includes(searchTerm))
                searchResults.push([prefix + element.name, element.name])
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
            )
        }
    }
    // Return results
    return searchResults
}
