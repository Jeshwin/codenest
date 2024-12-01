import {useContext, useEffect, useRef, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import FileElement from "./fileElement";
import NewElement from "./newElement";
import {EllipsisVertical, Folder, FolderOpen} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useDrag, useDrop} from "react-dnd";
import {TabData, TabType} from "react-layman";
import RenderElements from "./renderElements";

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
                {/** Show menu dots button only on hover */}
                {showDots && (
                    <Button
                        variant="ghost"
                        size="icon"
                        ref={VertDotsRef}
                        className="size-6 hover:bg-accent"
                    >
                        <EllipsisVertical />
                    </Button>
                )}
            </li>
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
