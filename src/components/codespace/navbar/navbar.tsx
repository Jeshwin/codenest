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
        <header className="top-0 flex flex-row gap-1 items-center px-3 py-2 font-sans">
            <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowExplorer(!showExplorer)}
                className="[&_svg]:size-6"
            >
                {showExplorer ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
            <Link href="/">
                <Logo size={8} />
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
