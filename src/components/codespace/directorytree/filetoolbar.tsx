import {Ellipsis, FilePlus, FolderPlus} from "lucide-react";
import {useState} from "react";

export default function FileToolBar({directoryData, setDirectoryData}) {
    const [elementName, setElementName] = useState("");
    const [addFile, setAddFile] = useState(false);
    const [addFolder, setAddFolder] = useState(false);

    function toggleAddFile() {
        setAddFile(!addFile);
        setAddFolder(false);
        setElementName("");
    }

    function toggleAddFolder() {
        setAddFolder(!addFolder);
        setAddFile(false);
        setElementName("");
    }

    function addElementToDirectoryData() {
        var elementToAdd: {
            type: string;
            name: string;
            items?: string[];
        } = {
            type: addFolder ? "directory" : "file",
            name: elementName,
        };
        if (addFolder) elementToAdd.items = [];
        console.log("Adding this to directoryData");
        console.debug(elementToAdd);
        setDirectoryData([...directoryData, elementToAdd]);
    }

    return (
        <>
            <div className="h-4 mt-2 pl-3 min-w-fit flex flex-row items-center text-[var(--fg-1)]">
                <span className="font-bold">Files</span>
                <span className="flex-grow"></span>
                <div
                    className="h-6 w-6 p-1 flex items-center rounded-lg hover:bg-[var(--bg-2)] active:scale-90 transition-transform duration-150 cursor-pointer"
                    onClick={() => toggleAddFile()}
                >
                    <FilePlus className="size-4" />
                </div>
                <div
                    className="h-6 w-6 p-1 flex items-center rounded-lg hover:bg-[var(--bg-2)] active:scale-90 transition-transform duration-150 cursor-pointer"
                    onClick={() => toggleAddFolder()}
                >
                    <FolderPlus className="size-4" />
                </div>
                <div className="h-6 w-6 p-1 flex items-center rounded-lg hover:bg-[var(--bg-2)] active:scale-90 transition-transform duration-150 cursor-pointer">
                    <Ellipsis className="size-4" />
                </div>
            </div>
            {addFile || addFolder ? (
                <div className="h-fit w-full my-2 pl-1 flex flex-row">
                    <input
                        placeholder={addFile ? "File name" : "Folder name"}
                        value={elementName}
                        onChange={e => setElementName(e.target.value)}
                        className="h-8 p-2 w-full rounded-lg placeholder-[var(--fg-2)] text-[var(--fg-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] 
                                   focus:ring-0 focus:outline-none focus:border-2 focus:border-[var(--toggle)]"
                    ></input>
                    <button
                        onClick={() => addElementToDirectoryData()}
                        className="w-fit h-auto mx-2 px-2 rounded-lg bg-[var(--bg-success)] text-[var(--fg-1)] text-center"
                    >
                        Add
                    </button>
                </div>
            ) : (
                <div className="h-2 w-full"></div>
            )}
        </>
    );
}
