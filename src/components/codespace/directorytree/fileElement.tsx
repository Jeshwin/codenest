import {useState, useContext, useEffect, MouseEventHandler} from "react";
import {Button} from "@/components/ui/button";
import {EllipsisVertical, File, Worm} from "lucide-react";
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
import ProjectStructureContext from "./projectStructureProvider";

import {useDrag, useDrop} from "react-dnd";
import {LaymanContext, TabData, TabType} from "react-layman";

export default function FileElement({item, parent, level}) {
    const {
        projectStructureDispatch,
        setElementCreationState,
        setIsGlobalDragging,
    } = useContext(ProjectStructureContext);
    const {setGlobalDragging, layoutDispatch} = useContext(LaymanContext);
    const [showDots, setShowDots] = useState(false);

    const styleColor = item.name[0].match(/[a-z]/i) // Check if first character is a letter
        ? `var(--${item.name[0].toUpperCase()})`
        : "#9D9D9D";
    const filePath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
        console.log(`Selected ${filePath}`);
        setElementCreationState((prevState) => ({
            ...prevState,
            currentFile: filePath,
        }));
        // Open file in layout on double-click
        if (event.detail === 2)
            layoutDispatch({
                type: "addTabWithHeuristic",
                tab: new TabData(item.name, {
                    type: "editor",
                    projectPath: filePath,
                    icon: <Worm className="size-4" />,
                }),
                heuristic: "topleft",
            });
    };

    const [{isDragging}, drag] = useDrag({
        type: TabType,
        item: {
            path: undefined,
            tab: new TabData(item.name, {
                type: "editor",
                projectPath: filePath,
                icon: <Worm className="size-4" />,
            }),
            data: {
                projectPath: filePath,
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
        setGlobalDragging(isDragging);
    }, [isDragging, setGlobalDragging, setIsGlobalDragging]);

    const handleMouseEnter = () => {
        setShowDots(true);
    };

    const handleMouseLeave = () => {
        setShowDots(false);
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <li
                    id={filePath}
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
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <File
                        style={{
                            color: styleColor,
                        }}
                        className="size-4 mr-1"
                    />
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
                                <DropdownMenuItem>Copy Name</DropdownMenuItem>
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
    );
}
