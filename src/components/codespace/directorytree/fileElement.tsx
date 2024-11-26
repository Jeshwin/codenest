import {useState, useContext, useRef, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {EllipsisVertical, File} from "lucide-react";
import ProjectStructureContext from "./projectStructureProvider";

import {useDrag, useDrop} from "react-dnd";
import {TabData, TabType} from "react-layman";

export default function FileElement({item, parent, level}) {
    const {moveItem, setCurrentFile, setIsGlobalDragging} = useContext(
        ProjectStructureContext
    );

    const [showDots, setShowDots] = useState(false);
    const VertDotsRef = useRef(null);

    const styleColor = item.name[0].match(/[a-z]/i) // Check if first character is a letter
        ? `var(--${item.name[0].toUpperCase()})`
        : "#9D9D9D";
    const filePath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleClick = () => {
        console.log(`Selected ${filePath}`);
        setCurrentFile(filePath);
    };

    const [{isDragging}, drag] = useDrag({
        type: TabType,
        item: {
            path: undefined,
            tab: new TabData(item.name),
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
            moveItem(item.data.projectPath, parent);
        },
    }));

    useEffect(() => {
        setIsGlobalDragging(isDragging);
    }, [isDragging, setIsGlobalDragging]);

    const handleMouseEnter = () => {
        setShowDots(true);
    };

    const handleMouseLeave = () => {
        setShowDots(false);
    };

    return (
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
            <Button
                ref={VertDotsRef}
                size="icon"
                variant="ghost"
                className={` ${
                    !showDots ? "hidden" : ""
                } size-6 hover:bg-accent`}
            >
                <EllipsisVertical />
            </Button>
        </li>
    );
}
