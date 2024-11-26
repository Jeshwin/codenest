"use client";

import ProjectName from "./projectname";
import Link from "next/link";
import {PanelLeftClose, PanelLeftOpen, Search, Server} from "lucide-react";
import {Button} from "@/components/ui/button";
import ThemePicker from "@/components/themepicker";
import Logo from "@/components/logo";
import UserDropdown from "./userDropdown";
import SettingsDropdown from "./settingsDropdown";

export default function Navbar({showExplorer, setShowExplorer}) {
    return (
        <header className="top-0 flex flex-row gap-1 items-center p-1">
            <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowExplorer(!showExplorer)}
            >
                {showExplorer ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
            <Link href="/">
                <Button size="icon" variant="ghost" className="[&_svg]:size-6">
                    <Logo size={8} />
                </Button>
            </Link>
            <ProjectName />
            <Button size="icon" variant="ghost">
                <Server />
            </Button>
            <div className="flex-grow"></div>
            <Button size="icon" variant="ghost">
                <Search />
            </Button>
            <ThemePicker />
            <UserDropdown />
            <SettingsDropdown />
        </header>
    );
}
