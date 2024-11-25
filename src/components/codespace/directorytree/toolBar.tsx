import {Ellipsis, FilePlus, FolderPlus, Search} from "lucide-react";
import {useContext, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import {Button} from "@/components/ui/button";
import FileExplorerSearchbar from "./searchBar";

export default function FileToolBar() {
    const {
        showNewElementInput,
        setShowNewElementInput,
        fileOrFolder,
        setFileOrFolder,
    } = useContext(ProjectStructureContext);
    const [showSearchbar, setShowSearchbar] = useState(false);

    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
    };

    const showNewInput = (newFileOrFolder: "file" | "directory") => {
        if (!showNewElementInput) {
            setShowNewElementInput(true);
            setFileOrFolder(newFileOrFolder);
        } else {
            if (newFileOrFolder !== fileOrFolder) {
                setFileOrFolder(newFileOrFolder);
            } else {
                setShowNewElementInput(false);
            }
        }
    };

    return (
        <>
            <div className="min-w-fit w-full flex flex-row items-center">
                <span className="font-bold">File Explorer</span>
                <div className="flex-1"></div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 hover:bg-muted"
                    onClick={() => toggleSearchbar()}
                >
                    <Search />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 hover:bg-muted"
                    onClick={() => showNewInput("file")}
                >
                    <FilePlus />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 hover:bg-muted"
                    onClick={() => showNewInput("directory")}
                >
                    <FolderPlus />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 hover:bg-muted"
                >
                    <Ellipsis />
                </Button>
            </div>
            {showSearchbar && <FileExplorerSearchbar />}
        </>
    );
}
