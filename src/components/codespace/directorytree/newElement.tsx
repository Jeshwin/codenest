import {FilePlus, FolderPlus} from "lucide-react";
import {
    KeyboardEventHandler,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import {ProjectDirectory, ProjectFile} from "./utils";

export default function NewElement({folderPath}: {folderPath: string}) {
    const {
        addItem,
        fileOrFolder,
        currentFile,
        showNewElementInput,
        setShowNewElementInput,
    } = useContext(ProjectStructureContext);
    const newElementInputRef = useRef(null);
    const [newElementName, setNewElementName] = useState("");

    // If the current file ever changes, stop showing the new element input
    useEffect(() => {
        setShowNewElementInput(false);
    }, [currentFile, setShowNewElementInput]);

    // Count the number of slashes in the current file path
    const slashCount = Math.max(0, currentFile.split("/").length - 1);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === "Enter") {
            const currentFilePath = currentFile.substring(
                0,
                currentFile.lastIndexOf("/")
            );
            console.log(`Adding ${newElementName} inside ${currentFilePath}`);
            let newElement: ProjectFile | ProjectDirectory;
            if (fileOrFolder === "file") {
                newElement = {
                    type: fileOrFolder,
                    name: newElementName,
                };
            } else {
                newElement = {
                    type: fileOrFolder,
                    name: newElementName,
                    items: [],
                    open: false,
                };
            }
            addItem(currentFilePath, newElement);
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
                    marginLeft: `${16 * slashCount + 1}px`,
                }}
                className="h-6 w-fit mr-px py-1 flex items-center cursor-pointer rounded hover:bg-muted border-0 focus-within:ring-1 focus-within:ring-primary"
            >
                {fileOrFolder === "file" ? (
                    <FilePlus className="size-4 mr-1" />
                ) : (
                    <FolderPlus className="size-4 mr-1" />
                )}
                <input
                    value={newElementName}
                    onChange={(e) => setNewElementName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Add ${fileOrFolder}...`}
                    className="h-6 bg-inherit flex-1 focus:outline-none"
                />
            </li>
        )
    );
}
