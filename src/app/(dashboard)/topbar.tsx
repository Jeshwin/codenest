"use client";

import UserDropdown from "@/components/codespace/navbar/userDropdown";
import ThemePicker from "@/components/themepicker";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {CircleHelp, Inbox, Search, Settings} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

export default function TopBar() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <header className="flex h-12 shrink-0 items-center gap-2 pr-3 py-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
            </div>
            <div className="flex-1 mx-20 relative">
                <Input
                    className="pl-7 h-8 bg-accent border-0 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="size-4 absolute top-2 left-2 text-accent-foreground" />
            </div>
            <ThemePicker />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="size-8">
                        <Inbox />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                    Inbox
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="size-8">
                        <CircleHelp />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                    Help
                </TooltipContent>
            </Tooltip>
            <UserDropdown />
        </header>
    );
}
