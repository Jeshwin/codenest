import {useContext, useEffect, useState} from "react";
import {ProjectStructure} from "./utils";
import ProjectStructureContext from "./projectStructureProvider";

export default function GutterRenderer() {
    const {projectStructure, toggleFolder, currentFile, showNewElementInput} =
        useContext(ProjectStructureContext);
    const [gutterMarks, setGutterMarks] = useState([]);

    const addGutter = (newGutter) => {
        setGutterMarks((oldGutterMarks) => [...oldGutterMarks, newGutter]);
    };

    const elementHeight = 24;

    useEffect(() => {
        const calculateGutterPosition = (
            folderName: string,
            level: number,
            folderContents: ProjectStructure
        ) => {
            let position = {
                top: 0,
                height: 0,
            };

            let calcTop = 0;
            const calculateTop = (
                structure: ProjectStructure,
                currentLevel: number
            ) => {
                structure.forEach((item) => {
                    calcTop += elementHeight; // Height of each file or folder
                    if (item.type === "directory" && item.open) {
                        if (
                            item.name === folderName &&
                            currentLevel === level
                        ) {
                            position.top = calcTop;
                            return;
                        }
                        calculateTop(item.items, currentLevel + 1);
                    }
                });
            };
            calculateTop(projectStructure, 0);
            position.top += 4;

            let calcHeight = 0;
            const calculateHeight = (
                structure: ProjectStructure,
                currentLevel: number
            ) => {
                structure.forEach((item) => {
                    calcHeight += elementHeight;
                    if (item.type === "directory" && item.open) {
                        calculateHeight(item.items, currentLevel + 1);
                    }
                });
            };
            calculateHeight(folderContents, level + 1);
            position.height = calcHeight;
            if (showNewElementInput && currentFile.includes(folderName)) {
                position.height += elementHeight;
            }
            return position;
        };

        const traverseStructure = (
            structure: ProjectStructure,
            parent: string,
            parentLevel: number
        ) => {
            structure.forEach((item) => {
                if (item.type === "directory" && item.open) {
                    const gutterPosition = calculateGutterPosition(
                        item.name,
                        parentLevel,
                        item.items
                    );

                    const itemPath = `${parent}${parent ? "/" : ""}${
                        item.name
                    }`;

                    addGutter(
                        <button
                            key={`gutter-${item.name}-${parentLevel}`}
                            className="absolute w-4 rounded cursor-pointer group flex flex-row-reverse"
                            style={{
                                top: `${gutterPosition.top}px`,
                                left: `${parentLevel * 8}px`,
                                height: `${gutterPosition.height}px`,
                            }}
                            onClick={() => toggleFolder(itemPath)}
                        >
                            <div className="bg-accent-foreground group-hover:bg-primary w-px mr-1 rounded h-full"></div>
                        </button>
                    );

                    traverseStructure(item.items, itemPath, parentLevel + 1);
                }
            });
        };

        setGutterMarks([]);
        traverseStructure(projectStructure, "", 0);
    }, [toggleFolder, currentFile, showNewElementInput, projectStructure]);

    return <>{gutterMarks}</>;
}
