import {useEffect, useState} from "react";
import {searchFilename} from "./utils";
import {Search} from "lucide-react";

export default function FileSearchBar({directoryData}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm.length >= 1) {
            const currentSearchResults = searchFilename(
                searchTerm,
                directoryData
            );
            console.debug(currentSearchResults);
            setSearchResults(currentSearchResults);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, directoryData]);

    const selectFile = filename => {
        console.log("Selected file " + filename);
        // Add select file to local storage
        localStorage.setItem("filename", filename);
        // Message other documents that filename is updated
        window.parent.postMessage({type: "filenameChanged", filename}, "*");
    };

    return (
        <div className="relative">
            <input
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="h-10 p-3 w-full rounded-xl placeholder-foreground bg-muted focus:ring-0 focus:outline-none border border-muted focus:border-primary"
            />
            <Search className="absolute inset-y-3 right-3 size-4" />
            <ul className="absolute w-fit min-w-full h-fit  flex flex-col mt-2 rounded-lg shadow-lg bg-accent">
                {searchResults.map((result, index) => (
                    <li
                        key={index}
                        className={`p-2 ${index == 0 ? "rounded-t-lg" : ""} ${
                            index == searchResults.length - 1
                                ? "rounded-b-lg"
                                : ""
                        } hover:bg-muted`}
                        onClick={() => selectFile("." + result[0])}
                    >
                        <span className="text-xs text-accent-foreground">
                            {result[0]}
                        </span>
                        <br></br>
                        {result[1]}
                    </li>
                ))}
            </ul>
        </div>
    );
}
