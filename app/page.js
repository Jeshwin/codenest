"use client";

import { useEffect, useState } from 'react';
import TreeView from "@/components/directorytree/treeview";
import PlaceholderWindow from '@/components/placeholders/placeholderwindow';
import ExampleCloudShell from '@/components/cloudshell/examplecloudshell';
import Editor from '@/components/editor/editor';

export default function Page() {
  const [directoryData, setDirectoryData] = useState(null)

  useEffect(() => {
    // Fetch the JSON data from the 'directory.json' file in the 'public' directory
    fetch('http://localhost:3030/directory')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        setDirectoryData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className='h-[calc(100vh-56px)] m-1 flex'>
      <div className="m-1 w-1/5 flex-none rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]">
        <TreeView items={directoryData} />
      </div>
      <div className='m-1 w-2/5 flex-1 flex rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]'>
        <Editor />
      </div>
      <div className='m-1 w-2/5 h-auto flex-1 flex rounded-lg bg-[var(--light-bg-1)] dark:bg-[var(--dark-bg-1)]'>
        <ExampleCloudShell />
      </div>
    </div>
  );
}
