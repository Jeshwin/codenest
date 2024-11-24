import {useEffect, useState} from "react";

export default function DropHighlighter({y, projectStructure}) {
    const [highlighterPositions, setHighlighterPositions] = useState([]);
    const [highlighterPosition, setHighlighterPosition] = useState(null);

    useEffect(() => {
        const positions = [];

        const traverse = (structure, parentName, parentTop, parentLevel) => {
            let top = parentTop;
            structure.forEach((item) => {
                if (item.type === "dir") {
                    const folderName = item.name;
                    const fullName = parentName
                        ? `${parentName}/${folderName}`
                        : folderName;
                    const left = parentLevel * 16 + 8;
                    let height = 32; // height of folder
                    if (item.open) {
                        height += traverse(
                            item.contents,
                            fullName,
                            top + 32,
                            parentLevel + 1
                        );
                    }
                    positions.push({top, left, height, fullName});
                    top += height;
                } else {
                    top += 32;
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
            {highlighterPosition && (
                <div
                    style={{
                        position: "absolute",
                        padding: "8px",
                        borderRadius: "8px",
                        top: `${highlighterPosition.top}px`,
                        left: `${highlighterPosition.left}px`,
                        height: `${highlighterPosition.height}px`,
                        width: `calc(100% - ${
                            highlighterPosition.left != 0 ? 4 : 0
                        }px - ${highlighterPosition.left}px)`,
                        pointerEvents: "none",
                    }}
                    className="border border-primary transition-all duration-150"
                ></div>
            )}
        </>
    );
}
