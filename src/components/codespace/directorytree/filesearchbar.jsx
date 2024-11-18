import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {searchFilename} from "./utils";

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

    const selectFile = (filename) => {
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 p-3 w-full rounded-xl placeholder-[var(--fg-1)] text-[var(--fg-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] focus:ring-0 focus:outline-none focus:border-2 focus:border-[var(--toggle)]"
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute inset-y-3 right-3 h-4 w-4 text-[var(--fg-1)]"
            />
            <ul className="absolute w-fit min-w-full h-fit  flex flex-col mt-2 rounded-lg shadow-lg bg-[var(--bg-2)] text-[var(--fg-1)]">
                {searchResults.map((result, index) => (
                    <li
                        key={index}
                        className={`p-2 ${index == 0 ? "rounded-t-lg" : ""} ${
                            index == searchResults.length - 1
                                ? "rounded-b-lg"
                                : ""
                        } hover:bg-[var(--bg-3)]`}
                        onClick={() => selectFile("." + result[0])}
                    >
                        <span className="text-xs text-[var(--fg-2)]">
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
