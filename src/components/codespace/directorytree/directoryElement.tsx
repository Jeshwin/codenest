import {useContext, useEffect, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import NewElement from "./newElement";
import RenderElements from "./renderElements";

import {EllipsisVertical, Folder, FolderOpen} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";

import {useDrag, useDrop} from "react-dnd";
import {TabData, TabType} from "react-layman";

export default function DirectoryElement({item, parent, level}) {
    const {
        projectStructureDispatch,
        elementCreationState,
        setIsGlobalDragging,
    } = useContext(ProjectStructureContext);
    const [showDots, setShowDots] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [newName, setNewName] = useState("");

    const styleColor = item.name[0].match(/[a-z]/i) // Check if first character is a letter
        ? `var(--${item.name[0].toUpperCase()})`
        : "#9D9D9D";
    const folderPath = `${parent}${parent ? "/" : ""}${item.name}`;

    const [{isDragging}, drag] = useDrag({
        type: TabType,
        item: {
            path: undefined,
            tab: new TabData(item.name),
            data: {
                projectPath: folderPath,
            },
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop(() => ({
        accept: [TabType],
        drop: (
            item: {tab: TabData; data?: {projectPath: string}},
            _monitor
        ) => {
            if (!item.data) return;
            projectStructureDispatch({
                type: "moveItem",
                itemPath: item.data.projectPath,
                newItemPath: folderPath,
            });
        },
    }));

    useEffect(() => {
        setIsGlobalDragging(isDragging);
    }, [isDragging, setIsGlobalDragging]);

    const handleToggleFolder = () => {
        projectStructureDispatch({
            type: "toggleFolder",
            itemPath: folderPath,
        });
    };

    const handleMouseEnter = () => {
        setShowDots(true);
    };

    const handleMouseLeave = () => {
        setShowDots(false);
    };

    useEffect(() => {
        if (
            !item.open &&
            elementCreationState.currentFile.includes(folderPath) &&
            elementCreationState.showInput
        ) {
            projectStructureDispatch({
                type: "toggleFolder",
                itemPath: folderPath,
            });
        }
    }, [
        elementCreationState.currentFile,
        elementCreationState.showInput,
        folderPath,
        item.open,
        projectStructureDispatch,
    ]);

    // Handlers for context menu actions

    // Helper function to access the user's clipboard
    async function writeClipboardText(text: string) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleCopyName = () => {
        writeClipboardText(item.name);
    };

    const handleCopyPath = () => {
        writeClipboardText(folderPath);
    };

    const handleToggleRename = () => {
        setShowRename(true);
    };

    const handleDuplicate = () => {
        projectStructureDispatch({
            type: "duplicateItem",
            itemPath: folderPath,
        });
    };

    // User confirms deletion in the modal
    const handleDelete = () => {
        projectStructureDispatch({
            type: "deleteItem",
            itemPath: folderPath,
        });
    };

    // Rename file form handlers

    const handleBlur = () => {
        setShowRename(false);
    };

    const handleRename = () => {
        projectStructureDispatch({
            type: "renameItem",
            itemPath: folderPath,
            newName: newName,
        });
    };

    return (
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger>
                    {/** Show rename file form if showRename flag is set */}
                    {showRename ? (
                        <form
                            style={{
                                marginLeft: `${16 * level + 1}px`,
                            }}
                            className="h-6 w-fit mr-px py-1 flex items-center cursor-pointer rounded hover:bg-muted border-0 focus-within:ring-1 focus-within:ring-primary"
                            onSubmit={handleRename}
                        >
                            <Folder
                                style={{
                                    color: styleColor,
                                }}
                                className="size-4 mr-1"
                            />
                            <input
                                autoFocus
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={handleBlur}
                                placeholder={item.name}
                                className="h-6 bg-inherit flex-1 focus:outline-none"
                            />
                        </form>
                    ) : (
                        <li
                            id={folderPath}
                            ref={(node) => {
                                drag(node);
                                drop(node);
                            }}
                            style={{
                                marginLeft: `${level * 16}px`,
                                width: `calc(100% - ${level * 16}px)`,
                            }}
                            className="flex items-center cursor-pointer rounded-lg hover:bg-muted"
                            draggable
                            onClick={handleToggleFolder}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/** Chnage folder icon if open */}
                            {item.open ? (
                                <FolderOpen
                                    style={{
                                        color: styleColor,
                                    }}
                                    className="size-4 mr-1"
                                />
                            ) : (
                                <Folder
                                    style={{
                                        color: styleColor,
                                    }}
                                    className="size-4 mr-1"
                                />
                            )}
                            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                {item.name}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className={` ${
                                            !showDots ? "text-transparent" : ""
                                        } size-6 hover:bg-accent`}
                                    >
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuContent className="w-48">
                                        <div className="text-xs text-muted-foreground px-2 py-1.5">
                                            {item.name}
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Download as zip
                                            <DropdownMenuShortcut>
                                                ⌘D
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleCopyName}
                                        >
                                            Copy Name
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleCopyPath}
                                        >
                                            Copy Path
                                            <DropdownMenuShortcut>
                                                ⌘⇧C
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleDuplicate}
                                        >
                                            Duplicate
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleToggleRename}
                                        >
                                            Rename
                                            <DropdownMenuShortcut>
                                                ⮐
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem className="text-destructive bg-destructive/25 hover:bg-destructive/50">
                                                Delete
                                                <DropdownMenuShortcut>
                                                    ⌘⌫
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenuPortal>
                            </DropdownMenu>
                        </li>
                    )}
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                    <div className="text-xs text-muted-foreground px-2 py-1.5">
                        {item.name}
                    </div>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        Download as zip
                        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={handleCopyName}>
                        Copy Name
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleCopyPath}>
                        Copy Path
                        <ContextMenuShortcut>⌘⇧C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={handleDuplicate}>
                        Duplicate
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleRename}>
                        Rename
                        <ContextMenuShortcut>⮐</ContextMenuShortcut>
                    </ContextMenuItem>
                    <DialogTrigger asChild>
                        <ContextMenuItem className="text-destructive bg-destructive/25 hover:bg-destructive/50">
                            Delete
                            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                        </ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>
            {/** Show directory contents if open */}
            {item.open && (
                <RenderElements
                    structure={item.items}
                    parent={folderPath}
                    level={level + 1}
                />
            )}
            {/** Show new element form if newElementPath is in directory */}
            <NewElement folderPath={folderPath} />
            {/** Modal for confirming deletion */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to
                        permanently delete this file from our servers?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={handleDelete}>
                            Confirm
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
