"use client";

import { useEffect, useState } from 'react';
import TreeView from "@/components/directorytree/treeview";
import PlaceholderWindow from '@/components/placeholders/placeholderwindow';

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
        console.debug(data)
        setDirectoryData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className='h-[calc(100vh-56px)] m-1 flex'>
      <div className="w-[320px] flex-none m-1 rounded-lg bg-slate-50 dark:bg-slate-700">
        <TreeView items={directoryData} />
      </div>
      <div className='m-1 flex-1 flex rounded-lg bg-slate-50 dark:bg-slate-700'>
        <PlaceholderWindow placeholderName={"Code Editor"} />
      </div>
      <div className='flex-1 flex flex-col h-full'>
        <div className='m-1 h-4/5 rounded-lg bg-slate-50 dark:bg-slate-700'>
          <PlaceholderWindow placeholderName={"Output"} />
        </div>
        <div className='m-1 h-1/5 rounded-lg bg-slate-50 dark:bg-slate-700'>
          <PlaceholderWindow placeholderName={"Shell"} />
        </div>
      </div>
    </div>
  );
}
