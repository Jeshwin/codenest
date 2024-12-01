import {Ellipsis, FilePlus, FolderPlus, Search} from "lucide-react";
import {useContext, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import {Button} from "@/components/ui/button";
import FileExplorerSearchbar from "./searchBar";

export default function FileToolBar() {
    const {elementCreationState, setElementCreationState} = useContext(
        ProjectStructureContext
    );
    const [showSearchbar, setShowSearchbar] = useState(false);

    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
    };

    const showNewInput = (newItemType: "file" | "directory") => {
        if (!elementCreationState.showInput) {
            setElementCreationState((prevState) => ({
                ...prevState,
                showInput: true,
                itemType: newItemType,
            }));
        } else {
            if (newItemType !== elementCreationState.itemType) {
                setElementCreationState((prevState) => ({
                    ...prevState,
                    itemType: newItemType,
                }));
            } else {
                setElementCreationState((prevState) => ({
                    ...prevState,
                    showInput: false,
                }));
            }
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <span className="font-bold flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    File Explorer
                </span>
                <div className="w-24">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 hover:bg-accent"
                        onClick={() => toggleSearchbar()}
                    >
                        <Search />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 hover:bg-accent"
                        onClick={() => showNewInput("file")}
                    >
                        <FilePlus />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 hover:bg-accent"
                        onClick={() => showNewInput("directory")}
                    >
                        <FolderPlus />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 hover:bg-accent"
                    >
                        <Ellipsis />
                    </Button>
                </div>
            </div>
            {showSearchbar && <FileExplorerSearchbar />}
        </>
    );
}
