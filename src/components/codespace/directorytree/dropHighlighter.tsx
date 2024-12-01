import {useContext, useEffect, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import {ProjectStructure} from "./types";

export default function DropHighlighter({y}) {
    const {projectStructure, elementCreationState, isGlobalDragging} =
        useContext(ProjectStructureContext);
    const [highlighterPositions, setHighlighterPositions] = useState([]);
    const [highlighterPosition, setHighlighterPosition] = useState(null);

    const elementHeight = 24;

    useEffect(() => {
        const positions = [];

        const traverse = (
            structure: ProjectStructure,
            parentName: string,
            parentTop: number,
            parentLevel: number
        ) => {
            let top = parentTop;
            structure.forEach((item) => {
                if (item.type === "directory") {
                    const folderName = item.name;
                    const fullName = parentName
                        ? `${parentName}/${folderName}`
                        : folderName;
                    const left = parentLevel * 16;
                    let height = elementHeight; // height of folder
                    if (item.open) {
                        height += traverse(
                            item.items,
                            fullName,
                            top + elementHeight,
                            parentLevel + 1
                        );
                    }
                    positions.push({top, left, height, fullName});
                    top += height;
                } else {
                    top += elementHeight;
                }
            });
            return top - parentTop;
        };

        const totalHeight = traverse(projectStructure, "", 4, 0); // Start from top position 4 (accounting for padding)
        positions.push({
            top: 0,
            left: 0,
            height: totalHeight + 8,
            fullName: "",
        });
        setHighlighterPositions(positions.sort((a, b) => a.top - b.top));
    }, [projectStructure]);

    useEffect(() => {
        // Find the most specific position that encapsulates the cursor's y coordinate
        let mostSpecificPosition = null;
        highlighterPositions.forEach((position) => {
            if (
                y >= position.top &&
                y <= position.top + position.height &&
                (!mostSpecificPosition ||
                    position.fullName.length >
                        mostSpecificPosition.fullName.length)
            ) {
                mostSpecificPosition = position;
            }
        });

        setHighlighterPosition(mostSpecificPosition);
    }, [highlighterPositions, y]);

    return (
        <>
            {isGlobalDragging && highlighterPosition && (
                <div
                    style={{
                        position: "absolute",
                        padding: 8,
                        borderRadius: 8,
                        top: `${highlighterPosition.top}px`,
                        left: `${highlighterPosition.left}px`,
                        height: `${highlighterPosition.height}px`,
                        width: `calc(100% - 4px - ${highlighterPosition.left}px)`,
                        pointerEvents: "none",
                    }}
                    className="border border-primary transition-all duration-150"
                ></div>
            )}
        </>
    );
}
