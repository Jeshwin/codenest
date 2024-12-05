import {FilePlus, FolderPlus} from "lucide-react";
import {useContext, useEffect, useRef, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import {ProjectDirectory, ProjectFile} from "./types";

export default function NewElement({folderPath}: {folderPath: string}) {
    const {
        projectStructureDispatch,
        elementCreationState,
        setElementCreationState,
    } = useContext(ProjectStructureContext);
    const [newElementName, setNewElementName] = useState("");

    const slashCount = Math.max(
        0,
        elementCreationState.currentFile.split("/").length - 1
    );

    const handleSubmit = () => {
        const currentFilePath = elementCreationState.currentFile.substring(
            0,
            elementCreationState.currentFile.lastIndexOf("/")
        );
        console.log(`Adding ${newElementName} inside ${currentFilePath}`);
        projectStructureDispatch({
            type: "addItem",
            itemPath: `${currentFilePath}${
                currentFilePath ? "/" : ""
            }${newElementName}`,
            itemType: elementCreationState.itemType,
        });
        setNewElementName("");
        setElementCreationState((prevState) => ({
            ...prevState,
            showInput: false,
        }));
    };

    const handleBlur = () => {
        setElementCreationState((prevState) => ({
            ...prevState,
            showInput: false,
        }));
    };

    return (
        elementCreationState.currentFile.substring(
            0,
            elementCreationState.currentFile.lastIndexOf("/")
        ) === folderPath &&
        elementCreationState.showInput && (
            <form
                style={{
                    marginLeft: `${16 * slashCount + 1}px`,
                }}
                className="h-6 w-fit mr-px py-1 flex items-center cursor-pointer rounded hover:bg-muted border-0 focus-within:ring-1 focus-within:ring-primary"
                onSubmit={handleSubmit}
            >
                {elementCreationState.itemType === "file" ? (
                    <FilePlus className="size-4 mr-1" />
                ) : (
                    <FolderPlus className="size-4 mr-1" />
                )}
                <input
                    autoFocus
                    value={newElementName}
                    onChange={(e) => setNewElementName(e.target.value)}
                    onBlur={handleBlur}
                    placeholder={`Add ${elementCreationState.itemType}...`}
                    className="h-6 bg-inherit flex-1 focus:outline-none"
                />
            </form>
        )
    );
}
