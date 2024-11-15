"use client";

import {useState, useEffect} from "react";

import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ProjectName() {
    const [projectName, setProjectName] = useState("ProjectName");

    useEffect(() => {
        // Fetch the JSON data from the 'projectname.json' file in the 'public' directory
        fetch("/projectname.json")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((data) => {
                setProjectName(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <button className="h-8 p-2 flex items-center rounded-lg bg-[var(--bg-2)] hover:bg-[var(--bg-3)] active:scale-90 transition-transform duration-150">
            {projectName}
            <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2 pl-1" />
        </button>
    );
}
