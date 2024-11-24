import {FilePlus, FolderPlus} from "lucide-react";
import {
    Dispatch,
    KeyboardEventHandler,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";

export default function NewElement({
    currentFile,
    showNewElementInput,
    setShowNewElementInput,
}: {
    currentFile: string;
    showNewElementInput: boolean;
    setShowNewElementInput: Dispatch<SetStateAction<boolean>>;
}) {
    const newElementInputRef = useRef(null);
    const [newElementName, setNewElementName] = useState("");
    const fileOrFolder = "file";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                newElementInputRef.current &&
                !newElementInputRef.current.contains(event.target)
            ) {
                setShowNewElementInput(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [setShowNewElementInput]);

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
        showNewElementInput && (
            <>
                <li
                    ref={newElementInputRef}
                    style={{
                        marginLeft: `${16 * slashCount + 4}px`,
                    }}
                    className="h-8 flex items-center p-1 cursor-pointer rounded-lg hover:bg-muted border border-transparent focus-within:ring-1 focus-within:ring-primary"
                >
                    {fileOrFolder === "file" ? (
                        <FilePlus className="size-6" />
                    ) : (
                        <FolderPlus className="size-6" />
                    )}
                    <input
                        value={newElementName}
                        onChange={(e) => setNewElementName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            fileOrFolder === "file"
                                ? "Add file..."
                                : "Add directory..."
                        }
                        className="h-6 bg-inherit p-1 flex-1 focus:outline-none"
                    />
                </li>
            </>
        )
    );
}
