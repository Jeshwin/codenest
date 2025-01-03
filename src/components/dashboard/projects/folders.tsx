"use client";

import {Button} from "@/components/ui/button";
import {Folder} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Folders({folders}: {folders: string[]}) {
    const pathname = usePathname();

    return (
        <div className="flex gap-x-4 flex-wrap">
            {folders.map((folderName, index) => (
                <Link key={index} href={`${pathname}/${folderName}`}>
                    <Button variant="outline">
                        <Folder />
                        {folderName}
                    </Button>
                </Link>
            ))}
        </div>
    );
}
