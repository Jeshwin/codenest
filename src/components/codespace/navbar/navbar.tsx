import ThemePicker from "../../common/themepicker";
import Logo from "../../common/logo";
import ProjectName from "./projectname";
import Link from "next/link";
import {Search, Server, Settings, User} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Navbar() {
    return (
        <header className="top-0 flex flex-row gap-1 items-center px-3 py-2 font-sans">
            <Link href="/">
                <Logo size={8} />
            </Link>
            <ProjectName />
            <Button size="icon" variant="ghost">
                <Server className="size-4" />
            </Button>
            <div className="flex-grow"></div>
            <Button size="icon" variant="ghost">
                <Search className="size-4" />
            </Button>
            <ThemePicker />
            <Button size="icon" variant="ghost">
                <User className="size-4" />
            </Button>
            <Button size="icon" variant="ghost">
                <Settings className="size-4" />
            </Button>
        </header>
    );
}
