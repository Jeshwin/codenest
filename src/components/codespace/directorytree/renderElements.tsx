import {useContext} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import FileElement from "./fileElement";
import DirectoryElement from "./directoryElement";

export default function RenderElements() {
    const {projectStructure} = useContext(ProjectStructureContext);
    return (
        <>
            {projectStructure.map((item) => {
                if (item.type === "file") {
                    return (
                        <FileElement
                            key={item.name}
                            item={item}
                            parent={""}
                            level={0}
                        />
                    );
                } else {
                    return (
                        <DirectoryElement
                            key={item.name}
                            item={item}
                            parent={""}
                            level={0}
                        />
                    );
                }
            })}
        </>
    );
}
