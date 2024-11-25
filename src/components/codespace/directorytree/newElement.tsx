import {FilePlus, FolderPlus} from "lucide-react";
import {
    KeyboardEventHandler,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import ProjectStructureContext from "./projectStructureProvider";

export default function NewElement({folderPath}: {folderPath: string}) {
    const {
        fileOrFolder,
        currentFile,
        showNewElementInput,
        setShowNewElementInput,
    } = useContext(ProjectStructureContext);
    const newElementInputRef = useRef(null);
    const [newElementName, setNewElementName] = useState("");

    // Count the number of slashes in the current file path
    const slashCount = Math.max(0, currentFile.split("/").length - 1);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === "Enter") {
            const currentFilePath = currentFile.substring(
                0,
                currentFile.lastIndexOf("/")
            );
            console.log(`Adding ${newElementName} inside ${currentFilePath}`);
            // const newElement = {
            //     type: fileOrFolder,
            //     name: newElementName,
            // };
            // if (fileOrFolder === "dir") {
            //     newElement.contents = [];
            //     newElement.open = false;
            // }
            // setShowModal(!addItem(currentFilePath, newElement));
            // Hide the input
            setNewElementName("");
            setShowNewElementInput(false);
        }
    };

    return (
        currentFile.substring(0, currentFile.lastIndexOf("/")) === folderPath &&
        showNewElementInput && (
            <li
                ref={newElementInputRef}
                style={{
                    marginLeft: `${16 * slashCount}px`,
                }}
                className="h-6 flex items-center cursor-pointer rounded-lg hover:bg-muted border border-transparent focus-within:ring-1 focus-within:ring-primary"
            >
                {fileOrFolder === "file" ? (
                    <FilePlus className="size-4" />
                ) : (
                    <FolderPlus className="size-4" />
                )}
                <input
                    value={newElementName}
                    onChange={(e) => setNewElementName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Add ${fileOrFolder}...`}
                    className="h-6 bg-inherit px-1 flex-1 focus:outline-none"
                />
            </li>
        )
    );
}
