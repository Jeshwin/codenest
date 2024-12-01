import {useContext} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import FileElement from "./fileElement";
import DirectoryElement from "./directoryElement";
import {ProjectStructure} from "./types";

export default function RenderElements({
    structure,
    parent,
    level,
}: {
    structure?: ProjectStructure;
    parent?: string;
    level?: number;
}) {
    const {projectStructure} = useContext(ProjectStructureContext);
    const renderedStructure = structure ?? projectStructure;

    return (
        <>
            {renderedStructure.map((item) => {
                if (item.type === "file") {
                    return (
                        <FileElement
                            key={item.name}
                            item={item}
                            parent={parent ?? ""}
                            level={level ?? 0}
                        />
                    );
                } else {
                    return (
                        <DirectoryElement
                            key={item.name}
                            item={item}
                            parent={parent ?? ""}
                            level={level ?? 0}
                        />
                    );
                }
            })}
        </>
    );
}
