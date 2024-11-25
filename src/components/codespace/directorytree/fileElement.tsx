import {useState, useContext, useRef} from "react";
import {Button} from "@/components/ui/button";
import {EllipsisVertical, File} from "lucide-react";
import {ProjectDirectory, ProjectFile} from "./utils";
import ProjectStructureContext from "./projectStructureProvider";

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

    const handleDragStart = (event) => {
        setIsGlobalDragging(true);
        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({
                type: "file",
                path: filePath,
            })
        );
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedData = JSON.parse(
            event.dataTransfer.getData("text/plain")
        );
        const targetPath = parent;
        const sourcePath = droppedData.path;

        moveItem(sourcePath, targetPath);
        setIsGlobalDragging(false);
    };

    const handleDragEnd = (event) => {
        event.preventDefault();
        setIsGlobalDragging(false);
    };

    const handleMouseEnter = () => {
        setShowDots(true);
    };

    const handleMouseLeave = () => {
        setShowDots(false);
    };

    return (
        <li
            id={filePath}
            style={{
                marginLeft: `${level * 16}px`,
                width: `calc(100% - ${level * 16}px)`,
            }}
            className="flex items-center cursor-pointer rounded-lg hover:bg-muted"
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <File
                style={{
                    color: styleColor,
                }}
                className="size-4 mr-0.5 flex-shrink-0"
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
                } size-6 hover:bg-muted`}
            >
                <EllipsisVertical />
            </Button>
        </li>
    );
}
