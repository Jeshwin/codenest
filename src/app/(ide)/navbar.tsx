"use client";

import ProjectName from "./projectname";
import Link from "next/link";
import {Search, Server, Settings, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import ThemePicker from "@/components/themepicker";
import Logo from "@/components/logo";
import {signOut} from "aws-amplify/auth";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

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
            <Button size="sm" variant="destructive" onClick={handleSignOut}>
                Sign Out
            </Button>
        </header>
    );
}
