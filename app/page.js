"use client";

import { useEffect, useRef, useState } from 'react';
import TreeView from "@/components/directorytree/treeview";

export default function Page() {
  const [directoryData, setDirectoryData] = useState(null)

  useEffect(() => {
    // Fetch the JSON data from the 'directory.json' file in the 'public' directory
    fetch('/directory.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => setDirectoryData(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <TreeView items={directoryData} />
  );
}
