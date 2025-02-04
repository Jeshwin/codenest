import CreateProjectButton from "@/components/dashboard/createproject";
import Greeting from "@/components/dashboard/home/greeting";
import WelcomeDialog from "@/components/dashboard/home/welcomedialog";
import ProjectCard from "@/components/dashboard/projectcard";
import {
    CppIcon,
    NodeJSIcon,
    PythonIcon,
} from "@/components/icons/languages/icons";
import {Button} from "@/components/ui/button";
import {BookOpen, PartyPopper, Plus, Users} from "lucide-react";
import Link from "next/link";

// Sample Data
const projectData = [
    {
        title: "Sirexa",
        language: PythonIcon,
        lastUpdated: new Date("December 25, 2024"),
        size: 4224216,
    },
    {
        title: "Bitmap to PNG",
        language: CppIcon,
        lastUpdated: new Date("February 20, 2022"),
        size: 167772,
    },
    {
        title: "Valorant Lite",
        language: NodeJSIcon,
        lastUpdated: new Date("January 2, 2025"),
        size: 25002048,
    },
];

const gettingStarted = [
    {
        action: "Join an event",
        icon: PartyPopper,
        href: "/events",
    },
    {
        action: "Find other users",
        icon: Users,
        href: "/people",
    },
    {
        action: "Read the docs",
        icon: BookOpen,
        href: "/docs",
    },
];

export default function HomePage() {
    return (
        <>
            <WelcomeDialog />
            <div>
                <Greeting />
                <div className="text-xl ml-1 mt-1">
                    What would you like to do today?
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-4">
                    <div className="text-3xl">Recent Projects</div>
                    <div className="flex space-x-4">
                        <Link href="/projects">
                            <Button variant="outline">See All</Button>
                        </Link>
                        <CreateProjectButton />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {projectData.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
            <div>
                <div className="text-2xl mb-4">Getting Started</div>
                <div className="flex gap-x-4 flex-wrap">
                    {gettingStarted.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <Button variant="outline">
                                <action.icon />
                                {action.action}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
