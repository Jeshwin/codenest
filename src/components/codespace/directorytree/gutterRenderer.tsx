import {useEffect, useState} from "react";
import {ProjectStructure} from "./utils";

export default function GutterRenderer({
    projectStructure,
    toggleFolder,
    currentFile,
    showNewElementInput,
}: {
    projectStructure: ProjectStructure;
    toggleFolder: (arg0: string) => void;
    currentFile: string;
    showNewElementInput: boolean;
}) {
    const [gutterMarks, setGutterMarks] = useState([]);

    const addGutter = (newGutter) => {
        setGutterMarks((oldGutterMarks) => [...oldGutterMarks, newGutter]);
    };

    useEffect(() => {
        const calculateGutterPosition = (folderName, level, folderContents) => {
            let position = {
                top: 0,
                height: 0,
            };

            let calcTop = 0;
            const calculateTop = (structure, currentLevel) => {
                structure.forEach((item) => {
                    calcTop += 32; // Height of each file or folder
                    if (item.type === "dir" && item.open) {
                        if (
                            item.name === folderName &&
                            currentLevel === level
                        ) {
                            position.top = calcTop;
                            return;
                        }
                        calculateTop(item.contents, currentLevel + 1);
                    }
                });
            };
            calculateTop(projectStructure, 0);
            position.top += 4;

            let calcHeight = 0;
            const calculateHeight = (structure, currentLevel) => {
                structure.forEach((item) => {
                    calcHeight += 32;
                    if (item.type === "dir" && item.open) {
                        calculateHeight(item.contents, currentLevel + 1);
                    }
                });
            };
            calculateHeight(folderContents, level + 1);
            position.height = calcHeight;
            if (showNewElementInput && currentFile.includes(folderName)) {
                position.height += 32;
            }
            return position;
        };

        const traverseStructure = (structure, parent, parentLevel) => {
            structure.forEach((item) => {
                if (item.type === "dir" && item.open) {
                    const gutterPosition = calculateGutterPosition(
                        item.name,
                        parentLevel,
                        item.contents
                    );

                    const itemPath = `${parent}${parent ? "/" : ""}${
                        item.name
                    }`;

                    addGutter(
                        <button
                            key={`gutter-${item.name}-${parentLevel}`}
                            className="absolute w-5 rounded cursor-pointer group flex flex-row-reverse"
                            style={{
                                top: `${gutterPosition.top}px`,
                                left: `${parentLevel * 16}px`,
                                height: `${gutterPosition.height}px`,
                            }}
                            onClick={() => toggleFolder(itemPath)}
                        >
                            <div className="group-hover:bg-indigo-500 w-px mr-1 rounded h-full bg-gray-500"></div>
                        </button>
                    );

                    traverseStructure(item.contents, itemPath, parentLevel + 1);
                }
            });
        };

        setGutterMarks([]);
        traverseStructure(projectStructure, "", 0);
    }, [toggleFolder, currentFile, showNewElementInput, projectStructure]);

    return <>{gutterMarks}</>;
}
