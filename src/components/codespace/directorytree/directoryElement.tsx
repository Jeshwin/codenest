import {useContext, useEffect, useRef, useState} from "react";
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

import {useDrag, useDrop} from "react-dnd";
import {TabData, TabType} from "react-layman";

export default function DirectoryElement({item, parent, level}) {
    const {
        projectStructureDispatch,
        elementCreationState,
        setIsGlobalDragging,
    } = useContext(ProjectStructureContext);
    const [showDots, setShowDots] = useState(false);
    const VertDotsRef = useRef(null);

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
                newItemPath: parent,
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

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
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
                                        Download
                                        <DropdownMenuShortcut>
                                            ⌘D
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Cut
                                        <DropdownMenuShortcut>
                                            ⌘X
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Copy
                                        <DropdownMenuShortcut>
                                            ⌘C
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Paste
                                        <DropdownMenuShortcut>
                                            ⌘V
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Copy Name
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Copy Path
                                        <DropdownMenuShortcut>
                                            ⌘⇧C
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Rename
                                        <DropdownMenuShortcut>
                                            ⮐
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive bg-destructive/25 hover:bg-destructive/50">
                                        Delete
                                        <DropdownMenuShortcut>
                                            ⌘⌫
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenuPortal>
                        </DropdownMenu>
                    </li>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                    <div className="text-xs text-muted-foreground px-2 py-1.5">
                        {item.name}
                    </div>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        Download
                        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        Cut
                        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        Copy
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        Paste
                        <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Copy Name</ContextMenuItem>
                    <ContextMenuItem>
                        Copy Path
                        <ContextMenuShortcut>⌘⇧C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                        Rename
                        <ContextMenuShortcut>⮐</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem className="text-destructive bg-destructive/25 hover:bg-destructive/50">
                        Delete
                        <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            {item.open && (
                <RenderElements
                    structure={item.items}
                    parent={folderPath}
                    level={level + 1}
                />
            )}

            <NewElement folderPath={folderPath} />
        </>
    );
}
