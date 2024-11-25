import {useContext, useEffect, useRef, useState} from "react";
import ProjectStructureContext from "./projectStructureProvider";
import {fuzzySearchFilename} from "./utils";
import {X} from "lucide-react";

export default function FileExplorerSearchbar() {
    const {projectStructure, setCurrentFile} = useContext(
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

    return (
        <div className="relative p-1">
            <input
                className="w-full pl-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                ref={searchInputRef}
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            {searchTerm && (
                <button
                    onClick={clearSearchTerm}
                    className="absolute right-0 top-0 p-2 rounded-md hover:brightness-75"
                >
                    <X className="size-6" />
                </button>
            )}
            <ul className="absolute w-fit max-h-80 m-2 overflow-y-scroll z-10 flex flex-col bg-indigo-50 dark:bg-indigo-950 shadow-lg rounded-lg *:flex *:flex-col *:p-2">
                {searchResults.map((result, index) => {
                    return (
                        <li
                            key={index}
                            className="hover:bg-indigo-100 hover:dark:bg-indigo-900 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
                            onClick={() => setCurrentFile(result.fullPath)}
                        >
                            <p className="text-xs text-indigo-800 dark:text-indigo-200">
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
                            <p className="text-indigo-900 dark:text-indigo-50">
                                {result.name}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
