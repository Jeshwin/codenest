import {useContext, useEffect, useRef, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import {fuzzySearchFilename} from "./utils";
import {X} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function FileExplorerSearchbar() {
    const {projectStructure, setElementCreationState} = useContext(
        ProjectStructureContext
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchTerm.length >= 1) {
            const currentSearchResults = fuzzySearchFilename(
                searchTerm,
                projectStructure
            );
            setSearchResults(currentSearchResults);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, projectStructure]);

    const clearSearchTerm = () => {
        setSearchTerm("");
        // Move focus back to the search input
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const selectSearchResult = (newCurrentFile: string) => {
        setElementCreationState((prevState) => ({
            ...prevState,
            currentFile: newCurrentFile,
        }));
    };

    return (
        <div className="relative">
            <input
                className="w-full pl-2 p-1 bg-accent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                ref={searchInputRef}
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            {searchTerm && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 size-6 hover:text-destructive hover:bg-muted"
                    onClick={clearSearchTerm}
                >
                    <X />
                </Button>
            )}
            <ul className="absolute w-full max-h-96 mt-1 overflow-y-scroll z-10 flex flex-col bg-background shadow-lg rounded-md *:flex *:flex-col *:p-2">
                {searchResults.map((result, index) => {
                    return (
                        <li
                            key={index}
                            className="hover:bg-muted first:rounded-t-lg last:rounded-b-lg cursor-pointer"
                            onClick={() => selectSearchResult(result.fullPath)}
                        >
                            <p className="text-xs text-muted-foreground">
                                {result.fullPath.split("").map((char, i) => (
                                    <span
                                        key={i}
                                        className={
                                            result.boldLetters.includes(i)
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {char}
                                    </span>
                                ))}
                            </p>
                            <p className="text-primary-foreground">
                                {result.name}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
