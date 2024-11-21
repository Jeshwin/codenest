"use client";

import {ChevronDown} from "lucide-react";
import {useState, useEffect} from "react";

export default function ProjectName() {
    const [projectName, setProjectName] = useState("ProjectName");

    useEffect(() => {
        // Fetch the JSON data from the 'projectname.json' file in the 'public' directory
        fetch("/projectname.json")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(data => {
                setProjectName(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <button className="h-8 p-2 flex items-center rounded-lg bg-accent hover:bg-muted">
            {projectName}
            <ChevronDown className="size-4 pl-1" />
        </button>
    );
}
